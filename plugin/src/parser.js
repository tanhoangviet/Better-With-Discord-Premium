"use strict";

const SUPPORTED_LANGS = new Set([
  "lua",
  "js",
  "javascript",
  "ts",
  "typescript",
  "py",
  "python",
  "python3",
  "py3",
  "json",
  "txt",
  "text"
]);

const TEXT_EXTENSIONS = new Set([".txt", ".lua", ".js", ".ts", ".py"]);
const MAX_BLOCKS = 50;
const MAX_BLOCK_LENGTH = 20000;

function normalizeLanguage(lang) {
  if (!lang) return "text";
  const clean = String(lang).trim().toLowerCase();
  if (clean === "javascript") return "js";
  if (clean === "typescript") return "ts";
  if (clean === "python" || clean === "python3" || clean === "py3") return "py";
  return clean;
}

function parseCodeBlocks(messageContent) {
  if (!messageContent || typeof messageContent !== "string") return [];

  const regex = /```([\w-]*)\n?([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = regex.exec(messageContent)) !== null) {
    if (blocks.length >= MAX_BLOCKS) break;

    const rawLanguage = normalizeLanguage(match[1]);
    const language = SUPPORTED_LANGS.has(rawLanguage) ? rawLanguage : "text";
    let code = match[2]?.replace(/\n$/, "") ?? "";

    // Guard large payloads to avoid performance/overflow issues on mobile.
    if (code.length > MAX_BLOCK_LENGTH) {
      code = `${code.slice(0, MAX_BLOCK_LENGTH)}\n\n/* Truncated: code block too large */`;
    }

    blocks.push({
      start: match.index,
      end: regex.lastIndex,
      language,
      code,
      raw: match[0]
    });
  }

  return blocks;
}

function getFileExtension(fileName) {
  if (!fileName || typeof fileName !== "string") return "";
  const idx = fileName.lastIndexOf(".");
  if (idx < 0) return "";
  return fileName.slice(idx).toLowerCase();
}

function shouldRenderTextPreview(attachment) {
  if (!attachment || typeof attachment !== "object") return false;
  const ext = getFileExtension(attachment.filename || "");
  const hasTextMime = (attachment.contentType || "").startsWith("text/");
  return TEXT_EXTENSIONS.has(ext) || hasTextMime;
}

function humanFileSize(sizeInBytes) {
  const size = Number(sizeInBytes) || 0;
  if (size < 1024) return `${size} B`;
  const units = ["KB", "MB", "GB"];
  let value = size / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

module.exports = {
  SUPPORTED_LANGS,
  TEXT_EXTENSIONS,
  MAX_BLOCKS,
  MAX_BLOCK_LENGTH,
  normalizeLanguage,
  parseCodeBlocks,
  getFileExtension,
  shouldRenderTextPreview,
  humanFileSize
};
