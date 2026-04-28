# Better with Discord Premium (Mobile Plugin)

Plugin này làm đúng ý bạn cho mobile:

## Tính năng

1. **Code block như Discord PC**
   - Tự nhận diện block theo cú pháp:
     ```md
     ```lua
     -- code
     ```
     ```
     hoặc `py/js/ts/txt`.
   - Mỗi block có **nút Copy** để copy full code.

2. **Highlight syntax mở rộng**
   - Hỗ trợ: `lua`, `js/javascript`, `ts/typescript`, `py/python`, `json`, `txt/text`.
   - Có normalize alias (`python -> py`, `typescript -> ts`, ...).

3. **Text file preview như desktop**
   - Khi attach các file `.txt`, `.lua`, `.js`, `.ts`, `.py` (hoặc MIME `text/*`), plugin render giao diện header giống desktop:
     - Tên file
     - Dung lượng file
     - Nút **Copy**
     - Nút **Download**

## Setup nhanh để deploy GitHub

1. Push code lên repo `tanhoangviet/Better-With-Discord-Premium` (branch `main`).
2. Chạy lệnh (ở local):
   ```bash
   GITHUB_REPOSITORY="tanhoangviet/Better-With-Discord-Premium" npm run prepare:manifest
   ```
3. Commit file `plugin/manifest.json` sau khi đã thay link thật.
4. Chạy build zip:
   ```bash
   npm run build
   ```
5. Lấy file zip sau khi build:
   - `dist/Better-with-Discord-Premium-mobile-plugin.zip`

> Lưu ý: file `.zip` là tệp nhị phân, đã loại khỏi git để tránh lỗi hiển thị diff "Tệp nhị phân không được hỗ trợ".

## Auto build khi tạo Release

Repo có workflow `.github/workflows/release.yml`:
- Tự test
- Tự đóng gói zip
- Tự upload zip vào GitHub Release

## Ghi chú tích hợp host plugin

`index.js` kỳ vọng host cung cấp:
- `patchMessageTransformer(transformerFn)`
- `getAttachmentText(attachment)`
- `downloadAttachment(attachment)`
- `logger(msg)` (optional)

Nếu host API khác, chỉ cần map lại trong `mountMessageEnhancer(api)`.
