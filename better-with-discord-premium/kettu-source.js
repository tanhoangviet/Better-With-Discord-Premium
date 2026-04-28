"use strict";

/**
 * Better with Discord Premium
 *
 * Mobile-first plugin scaffold for Bunny/Kettu-like plugin hosts.
 * This plugin does 2 things:
 * 1) Adds a Copy button for triple-backtick code blocks (```lang ... ```)
 * 2) Adds a desktop-like top navigation bar for text attachments (.txt/.lua/.js/.ts/.py)
 *
 * Integration hooks are intentionally isolated in `mountMessageEnhancer` so it is easy
 * to adapt to your specific plugin host API.
 */

const {
  parseCodeBlocks,
  shouldRenderTextPreview,
  humanFileSize
} = require("./src/parser");

const state = {
  unpatch: []
};

function copyToClipboard(text) {
  // Prefer the Web Clipboard API if available.
  if (globalThis.navigator?.clipboard?.writeText) {
    return globalThis.navigator.clipboard.writeText(text);
  }

  // Fallback for React Native environments that expose a Clipboard module.
  const Clipboard = globalThis.Clipboard || globalThis.NativeModules?.Clipboard;
  if (Clipboard?.setString) {
    Clipboard.setString(text);
    return Promise.resolve();
  }

  return Promise.reject(new Error("Clipboard API unavailable in this client."));
}

function createCodeBlockCard(block) {
  return {
    type: "CodeBlockCard",
    props: {
      language: block.language,
      code: block.code,
      actions: [
        {
          id: "copy-code",
          label: "Copy",
          onPress: () => copyToClipboard(block.code)
        }
      ]
    }
  };
}

function createAttachmentHeader(attachment, onCopy, onDownload) {
  return {
    type: "AttachmentHeader",
    props: {
      fileName: attachment.filename,
      fileSize: humanFileSize(attachment.size),
      actions: [
        {
          id: "copy-text",
          label: "Copy",
          onPress: onCopy
        },
        {
          id: "download-file",
          label: "Download",
          onPress: onDownload
        }
      ]
    }
  };
}

function enhanceMessagePayload(message, resolver) {
  if (!message || typeof message !== "object") return message;

  const next = { ...message };

  // 1) Triple-backtick block enhancement.
  const blocks = parseCodeBlocks(message.content || "");
  if (blocks.length) {
    next.enhancedCodeBlocks = blocks.map(createCodeBlockCard);
  }

  // 2) Text attachment enhancement.
  const attachments = Array.isArray(message.attachments) ? message.attachments : [];
  next.enhancedTextAttachments = attachments
    .filter(shouldRenderTextPreview)
    .map((attachment) => {
      const text = resolver.getAttachmentText?.(attachment) || "";
      return {
        header: createAttachmentHeader(
          attachment,
          () => copyToClipboard(text),
          () => resolver.downloadAttachment?.(attachment)
        ),
        previewText: text
      };
    });

  return next;
}

function mountMessageEnhancer(api) {
  // Host contract expected:
  // - api.patchMessageTransformer(transformerFn): () => unpatch
  // - api.logger(message)
  // - api.getAttachmentText(attachment)
  // - api.downloadAttachment(attachment)

  if (!api?.patchMessageTransformer) {
    throw new Error("Plugin host API missing patchMessageTransformer");
  }

  const unpatch = api.patchMessageTransformer((message) =>
    enhanceMessagePayload(message, {
      getAttachmentText: api.getAttachmentText,
      downloadAttachment: api.downloadAttachment
    })
  );

  state.unpatch.push(unpatch);
  api.logger?.("[Better with Discord Premium] message enhancer mounted");
}

function unmountAll() {
  for (const unpatch of state.unpatch.splice(0)) {
    if (typeof unpatch === "function") {
      unpatch();
    }
  }
}

module.exports = {
  name: "Better with Discord Premium",
  description:
    "Adds mobile code-block copy buttons, richer syntax previews, and text-file navigation headers.",
  version: "0.1.0",
  authors: ["Codex"],

  onLoad(api) {
    mountMessageEnhancer(api);
  },

  onUnload() {
    unmountAll();
  },

  // Exposed for tests.
  _internal: {
    enhanceMessagePayload,
    copyToClipboard,
    createCodeBlockCard,
    createAttachmentHeader
  }
};
