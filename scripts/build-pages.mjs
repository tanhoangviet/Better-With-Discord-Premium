import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY || "tanhoangviet/Better-With-Discord-Premium";
const [owner, name] = repo.split("/");
const baseUrl = `https://${owner}.github.io/${name}`;
const rawBase = `https://raw.githubusercontent.com/${owner}/${name}/main`;

const docsDir = path.resolve("docs");
fs.rmSync(docsDir, { recursive: true, force: true });
fs.mkdirSync(docsDir, { recursive: true });

const srcManifest = JSON.parse(fs.readFileSync(path.resolve("plugin/manifest.json"), "utf8"));
const pluginSlug = srcManifest.id || "better-with-discord-premium";
const pluginDir = path.join(docsDir, pluginSlug);
fs.mkdirSync(pluginDir, { recursive: true });

const manifestJsonUrl = `${rawBase}/plugin/manifest.json`;
const sourceJsUrl = `${rawBase}/plugin/index.js`;

const pluginIndexRaw = fs.readFileSync(path.resolve("plugin/index.js"), "utf8");
const kettuBanner = `// Better with Discord Premium\n// Manifest JSON: ${manifestJsonUrl}\n// Source JS: ${sourceJsUrl}\n\n`;
const pluginIndex = `${kettuBanner}${pluginIndexRaw}`;

// JS endpoints for Kettu (direct source URL input)
fs.writeFileSync(path.join(docsDir, "index.js"), pluginIndex);
fs.writeFileSync(path.join(docsDir, "kettu-source.js"), pluginIndex);
fs.writeFileSync(path.join(pluginDir, "index.js"), pluginIndex);
fs.writeFileSync(path.join(pluginDir, "kettu-source.js"), pluginIndex);

const pagesManifest = {
  ...srcManifest,
  main: `${baseUrl}/${pluginSlug}/kettu-source.js`,
  source: `${baseUrl}/${pluginSlug}/kettu-source.js`,
  updateUrl: `${baseUrl}/${pluginSlug}/manifest.json`,
  readme: `${baseUrl}/${pluginSlug}/README.vi.md`
};

fs.writeFileSync(path.join(docsDir, "manifest.json"), JSON.stringify(pagesManifest, null, 2) + "\n");
fs.writeFileSync(path.join(pluginDir, "manifest.json"), JSON.stringify(pagesManifest, null, 2) + "\n");
fs.copyFileSync(path.resolve("plugin/README.vi.md"), path.join(docsDir, "README.vi.md"));
fs.copyFileSync(path.resolve("plugin/README.vi.md"), path.join(pluginDir, "README.vi.md"));

const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Better with Discord Premium</title>
</head>
<body style="font-family: system-ui, sans-serif; max-width: 760px; margin: 32px auto; padding: 0 16px;">
  <h1>Better with Discord Premium</h1>
  <p><strong>Kettu source URL (.js):</strong></p>
  <pre>${sourceJsUrl}</pre>
  <p><strong>Manifest URL (.json):</strong></p>
  <pre>${manifestJsonUrl}</pre>
  <p><strong>GitHub Pages JS:</strong></p>
  <pre>${baseUrl}/${pluginSlug}/kettu-source.js</pre>
</body>
</html>`;

fs.writeFileSync(path.join(docsDir, "index.html"), html);
console.log(`Built plugin files for ${baseUrl}/${pluginSlug}`);
