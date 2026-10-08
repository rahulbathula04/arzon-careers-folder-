import { spawn } from "node:child_process";
import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadRoutes() {
  const manifestPath = resolve(process.cwd(), "quality/route-manifest.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  return [...new Set((manifest.routes ?? []).map((route) => route.path ?? route).filter(Boolean))];
}

async function waitForServer(url, timeoutMs = 120_000) {
  const started = Date.now();
  let lastError = null;
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status >= 200 && response.status < 500) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? "server did not respond"}`);
}

export async function withBrowserServer(run) {
  const suppliedBase = process.env.PW_BASE_URL;
  if (suppliedBase) return run(suppliedBase.replace(/\/$/, ""));

  const port = Number(process.env.APQG_PORT ?? 4173);
  const base = `http://127.0.0.1:${port}`;
  mkdirSync(resolve("artifacts"), { recursive: true });
  const logStream = createWriteStream(resolve("artifacts/quality-dev-server.log"), { flags: "w" });
  const child = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)], {
    cwd: process.cwd(),
    env: { ...process.env, BROWSER: "none" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.pipe(logStream);
  child.stderr.pipe(logStream);

  try {
    await waitForServer(base);
    return await run(base);
  } finally {
    child.kill("SIGTERM");
    await new Promise((resolvePromise) => {
      const timer = setTimeout(resolvePromise, 3_000);
      child.once("exit", () => {
        clearTimeout(timer);
        resolvePromise();
      });
    });
    logStream.end();
  }
}

export function writeJson(filePath, value) {
  mkdirSync(resolve(filePath, ".."), { recursive: true });
  writeFileSync(filePath, JSON.stringify(value, null, 2));
}
