var DEFAULT_AUTH_HEADER = "Authorization";
var DEFAULT_API_BASE_URL = "https://api.lovable.dev";
var DEFAULT_SEND_PATH = "/v1/messaging/email/send";
var EmailAPIError = class extends Error {
  constructor(status, message, retryAfterSeconds) {
    super(message);
    this.name = "EmailAPIError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
  get retryable() {
    return this.status === 429 || this.status >= 500 && this.status < 600;
  }
};
function parseRetryAfter(header) {
  if (!header)
    return null;
  const parsed = Number(header);
  if (!Number.isNaN(parsed))
    return parsed;
  const date = new Date(header);
  if (!Number.isNaN(date.getTime())) {
    return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 1e3));
  }
  return null;
}
function buildAuthHeaderValue(apiKey) {
  return `Bearer ${apiKey}`;
}
async function sendLovableEmail(payload, options) {
  const apiKey = options.apiKey;
  if (!apiKey) {
    throw new Error("Missing Lovable API key");
  }
  const authHeader = options.authHeader ?? DEFAULT_AUTH_HEADER;
  const sendUrl = options.sendUrl;
  const apiBaseUrl = options.apiBaseUrl ?? DEFAULT_API_BASE_URL;
  const url = sendUrl || `${apiBaseUrl.replace(/\/$/, "")}${DEFAULT_SEND_PATH}`;
  const idempotencyKey = options.idempotencyKey ?? payload.idempotency_key ?? payload.run_id;
  const headers = {
    [authHeader]: buildAuthHeaderValue(apiKey),
    "Content-Type": "application/json"
  };
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    const safeErrorText = errorText.length > 500 ? `${errorText.slice(0, 500)}...` : errorText;
    throw new EmailAPIError(
      response.status,
      `Email API error: ${response.status} ${safeErrorText}`,
      parseRetryAfter(response.headers.get("Retry-After"))
    );
  }
  return await response.json();
}
export {
  sendLovableEmail as s
};
