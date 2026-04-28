import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY || "tanhoangviet/Better-With-Discord-Premium";
const [owner, name] = repo.split("/");
const baseUrl = `https://${owner}.github.io/${name}`;

const docsDir = path.resolve("docs");
fs.mkdirSync(docsDir, { recursive: true });

const pluginIndex = fs.readFileSync(path.resolve("plugin/index.js"), "utf8");
fs.writeFileSync(path.join(docsDir, "index.js"), pluginIndex);

const srcManifest = JSON.parse(fs.readFileSync(path.resolve("plugin/manifest.json"), "utf8"));
const pagesManifest = {
  ...srcManifest,
  source: `${baseUrl}/index.js`,
  updateUrl: `${baseUrl}/manifest.json`,
  readme: `${baseUrl}/README.vi.md`
};
fs.writeFileSync(path.join(docsDir, "manifest.json"), JSON.stringify(pagesManifest, null, 2) + "\n");

fs.copyFileSync(path.resolve("plugin/README.vi.md"), path.join(docsDir, "README.vi.md"));

const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Better with Discord Premium</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 760px; margin: 40px auto; padding: 0 16px; }
    code, pre { background: #f4f4f5; padding: 2px 6px; border-radius: 6px; }
    .box { border: 1px solid #ddd; border-radius: 12px; padding: 16px; }
  </style>
</head>
<body>
  <h1>Better with Discord Premium</h1>
  <div class="box">
    <p><strong>Install URL:</strong></p>
    <pre>${baseUrl}/</pre>
    <p>Nếu client yêu cầu URL manifest trực tiếp, dùng:</p>
    <pre>${baseUrl}/manifest.json</pre>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(docsDir, "index.html"), html);
console.log(`Built GitHub Pages files for ${baseUrl}`);
