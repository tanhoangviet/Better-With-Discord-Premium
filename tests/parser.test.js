"use strict";

const assert = require("assert");
const {
  parseCodeBlocks,
  shouldRenderTextPreview,
  humanFileSize,
  normalizeLanguage,
  MAX_BLOCK_LENGTH
} = require("../plugin/src/parser");

(function run() {
  const content = "before\n```lua\nprint('x')\n```\nafter\n```python3\nprint('y')\n```";
  const blocks = parseCodeBlocks(content);
  assert.strictEqual(blocks.length, 2);
  assert.strictEqual(blocks[0].language, "lua");
  assert.strictEqual(blocks[1].language, "py");

  assert.strictEqual(shouldRenderTextPreview({ filename: "a.ts" }), true);
  assert.strictEqual(shouldRenderTextPreview({ filename: "a.png" }), false);
  assert.strictEqual(shouldRenderTextPreview({ filename: "a.unknown", contentType: "text/plain" }), true);

  assert.strictEqual(humanFileSize(512), "512 B");
  assert.strictEqual(humanFileSize(2048), "2.0 KB");
  assert.strictEqual(normalizeLanguage("TypeScript"), "ts");
  assert.strictEqual(normalizeLanguage("py3"), "py");

  const huge = `\`\`\`py\n${"a".repeat(MAX_BLOCK_LENGTH + 100)}\n\`\`\``;
  const hugeBlock = parseCodeBlocks(huge)[0];
  assert.strictEqual(hugeBlock.language, "py");
  assert.ok(hugeBlock.code.includes("Truncated"));
  assert.ok(hugeBlock.code.length > MAX_BLOCK_LENGTH);

  console.log("All parser tests passed.");
})();
