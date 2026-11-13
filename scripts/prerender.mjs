import { readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";
// This landing page has no client state. Ship readable HTML without a JS runtime.
const file = new URL("../dist/index.html", import.meta.url);
const template = await readFile(file, "utf8");
if (!template.includes('<div id="root"></div>'))
  throw new Error("Missing prerender mount");
const html = template
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, "");
await writeFile(file, html);
await rm(new URL("../.prerender/", import.meta.url), {
  recursive: true,
  force: true,
});
console.log(
  "Prerendered all landing-page content; no client JavaScript required.",
);
