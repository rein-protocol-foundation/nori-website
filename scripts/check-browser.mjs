import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { preview } from "vite";

// Use an isolated port and await Vite readiness; never test an unrelated server.
const server = await preview({
  preview: { host: "127.0.0.1", port: 0, strictPort: true, open: false },
});

try {
  await mkdir("artifacts", { recursive: true });
  const address = server.httpServer.address();
  const url = `http://127.0.0.1:${address.port}`;
  for (const file of [
    "browser",
    "landing",
    "continuity",
    "badges",
    "badge-layout",
  ]) {
    console.log(`\nRunning ${file} checks against ${url}`);
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [`tests/${file}.mjs`], {
        stdio: "inherit",
        env: { ...process.env, TEST_URL: url, TEST_BROWSER: "chromium" },
      });
      child.on("error", reject);
      child.on("exit", (code, signal) => {
        if (code === 0) resolve();
        else reject(new Error(`${file} checks failed (${signal || code})`));
      });
    });
  }
} finally {
  await new Promise((resolve, reject) => {
    server.httpServer.close((error) => (error ? reject(error) : resolve()));
    server.httpServer.closeAllConnections();
  });
}
