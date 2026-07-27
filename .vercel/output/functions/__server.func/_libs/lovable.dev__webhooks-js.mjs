var DEFAULT_SIGNATURE_HEADER = "x-lovable-signature";
var DEFAULT_TIMESTAMP_HEADER = "x-lovable-timestamp";
var DEFAULT_TOLERANCE_MS = 5 * 60 * 1e3;
var DEFAULT_MAX_BODY_BYTES = 1 << 20;
var WebhookError = class extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
};
async function computeSignature(signedPayload, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign"
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  return "sha256=" + Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function constantTimeEqual(a, b) {
  if (a.length !== b.length)
    return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
async function verifyWebhookSignature({
  signedPayload,
  signature,
  secret,
  secrets
}) {
  if (!signature)
    return false;
  const candidates = [secret, ...secrets ?? []].filter((value) => Boolean(value));
  if (candidates.length === 0) {
    throw new WebhookError("missing_secret", "Missing webhook secret");
  }
  for (const candidate of candidates) {
    const expected = await computeSignature(signedPayload, candidate);
    if (constantTimeEqual(signature, expected)) {
      return true;
    }
  }
  return false;
}
function parseTimestamp(timestamp) {
  const numeric = Number(timestamp);
  if (Number.isFinite(numeric)) {
    if (Math.abs(numeric) < 1e12) {
      return numeric * 1e3;
    }
    return numeric;
  }
  const parsed = Date.parse(timestamp);
  if (!Number.isNaN(parsed)) {
    return parsed;
  }
  throw new WebhookError("invalid_timestamp", "Invalid webhook timestamp");
}
async function verifyWebhookRequest({
  req,
  secret,
  secrets,
  signatureHeader = DEFAULT_SIGNATURE_HEADER,
  timestampHeader = DEFAULT_TIMESTAMP_HEADER,
  toleranceMs = DEFAULT_TOLERANCE_MS,
  maxBodyBytes = DEFAULT_MAX_BODY_BYTES,
  parser
}) {
  const signature = req.headers.get(signatureHeader);
  const timestamp = req.headers.get(timestampHeader);
  if (!timestamp) {
    throw new WebhookError("missing_timestamp", "Missing webhook timestamp");
  }
  const timestampMs = parseTimestamp(timestamp);
  const skew = Math.abs(Date.now() - timestampMs);
  if (skew > toleranceMs) {
    throw new WebhookError("stale_timestamp", "Webhook timestamp outside tolerance window");
  }
  const body = await req.text();
  if (new TextEncoder().encode(body).length > maxBodyBytes) {
    throw new WebhookError("body_too_large", "Webhook body exceeds size limit");
  }
  const signedPayload = `${timestamp}.${body}`;
  const isValid = await verifyWebhookSignature({
    signedPayload,
    signature,
    secret,
    secrets
  });
  if (!isValid) {
    throw new WebhookError("invalid_signature", "Invalid webhook signature");
  }
  const parseBody = parser ?? ((raw) => JSON.parse(raw));
  let payload;
  try {
    payload = parseBody(body);
  } catch {
    if (parser) {
      throw new WebhookError("invalid_payload", "Failed to parse webhook payload");
    }
    throw new WebhookError("invalid_json", "Invalid JSON in request body");
  }
  return { body, payload, timestamp };
}
export {
  WebhookError as W,
  verifyWebhookRequest as v
};
