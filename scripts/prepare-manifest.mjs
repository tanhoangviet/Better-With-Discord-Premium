import fs from "fs";
import path from "path";

const repo = process.env.GITHUB_REPOSITORY || "YOUR_USERNAME/YOUR_REPO";
const rawBase = `https://raw.githubusercontent.com/${repo}/main/plugin`;

const manifestPath = path.resolve("plugin/manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

manifest.version = process.env.PLUGIN_VERSION || manifest.version;
manifest.source = `${rawBase}/index.js`;
manifest.updateUrl = `${rawBase}/manifest.json`;
manifest.readme = `${rawBase}/README.vi.md`;
manifest.repository = `https://github.com/${repo}`;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Manifest prepared for ${repo}`);
