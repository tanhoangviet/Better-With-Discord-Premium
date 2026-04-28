import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY || "tanhoangviet/Better-With-Discord-Premium";
const [owner, name] = repo.split("/");
const baseUrl = `https://${owner}.github.io/${name}`;
const rawBase = `https://raw.githubusercontent.com/${owner}/${name}/main/docs`;

const docsDir = path.resolve("docs");
fs.mkdirSync(docsDir, { recursive: true });

const srcManifest = JSON.parse(fs.readFileSync(path.resolve("plugin/manifest.json"), "utf8"));
const pluginSlug = srcManifest.id || "better-with-discord-premium";
const pluginDir = path.join(docsDir, pluginSlug);
fs.mkdirSync(pluginDir, { recursive: true });

const pluginIndex = fs.readFileSync(path.resolve("plugin/index.js"), "utf8");
fs.writeFileSync(path.join(pluginDir, "index.js"), pluginIndex);
fs.writeFileSync(path.join(pluginDir, "kettu-source.js"), pluginIndex);

const pagesManifest = {
  ...srcManifest,
  main: "index.js",
  source: `${baseUrl}/${pluginSlug}/index.js`,
  updateUrl: `${baseUrl}/${pluginSlug}/manifest.json`,
  readme: `${baseUrl}/${pluginSlug}/README.vi.md`
};

const rawManifest = {
  ...srcManifest,
  main: `${rawBase}/${pluginSlug}/kettu-source.js`,
  source: `${rawBase}/${pluginSlug}/kettu-source.js`,
  updateUrl: `${rawBase}/${pluginSlug}/kettu-manifest.json`,
  readme: `${rawBase}/${pluginSlug}/README.vi.md`
};

fs.writeFileSync(path.join(pluginDir, "manifest.json"), JSON.stringify(pagesManifest, null, 2) + "\n");
fs.writeFileSync(path.join(pluginDir, "kettu-manifest.json"), JSON.stringify(rawManifest, null, 2) + "\n");
fs.copyFileSync(path.resolve("plugin/README.vi.md"), path.join(pluginDir, "README.vi.md"));

fs.writeFileSync(path.join(docsDir, "manifest.json"), JSON.stringify(pagesManifest, null, 2) + "\n");
fs.writeFileSync(path.join(docsDir, "kettu-manifest.json"), JSON.stringify(rawManifest, null, 2) + "\n");
fs.writeFileSync(path.join(docsDir, "index.js"), pluginIndex);
fs.writeFileSync(path.join(docsDir, "kettu-source.js"), pluginIndex);
fs.copyFileSync(path.resolve("plugin/README.vi.md"), path.join(docsDir, "README.vi.md"));

const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Better with Discord Premium</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 760px; margin: 40px auto; padding: 0 16px; }
    code, pre { background: #f4f4f5; padding: 2px 6px; border-radius: 6px; overflow: auto; }
    .box { border: 1px solid #ddd; border-radius: 12px; padding: 16px; }
  </style>
</head>
<body>
  <h1>Better with Discord Premium</h1>
  <div class="box">
    <p><strong>Kettu source URL (JS trực tiếp - khuyên dùng):</strong></p>
    <pre>${rawBase}/${pluginSlug}/kettu-source.js</pre>
    <p><strong>Plugin URL chuẩn (Revenge/Bunny/Vendetta):</strong></p>
    <pre>${baseUrl}/${pluginSlug}</pre>
    <p><strong>Manifest URL trực tiếp:</strong></p>
    <pre>${baseUrl}/${pluginSlug}/manifest.json</pre>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(docsDir, "index.html"), html);
console.log(`Built plugin files for ${baseUrl}/${pluginSlug}`);
