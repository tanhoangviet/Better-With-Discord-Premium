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

## URL cài plugin (chuẩn theo revenge-plugins)

- Plugin URL chuẩn: `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium`
- Manifest URL chuẩn: `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium/manifest.json`

Theo pattern chuẩn giống repo `Lioncat6/revenge-plugins`: `https://<user>.github.io/<repo>/<plugin-folder>`.
## URL cài plugin (GitHub Pages)

- Base URL: `https://tanhoangviet.github.io/Better-With-Discord-Premium/`
- Manifest URL: `https://tanhoangviet.github.io/Better-With-Discord-Premium/manifest.json`

Nếu client báo `Failed to fetch manifest`, hãy dùng URL manifest trực tiếp ở trên.

## Setup nhanh để deploy GitHub

1. Push code lên repo `tanhoangviet/Better-With-Discord-Premium` (branch `main`).
2. Chạy build:
   ```bash
   npm install
   npm run build
   ```
3. Push lên `main`, workflow `.github/workflows/pages.yml` sẽ publish website `github.io`.

## Auto build khi tạo Release

Repo có workflow `.github/workflows/release.yml`:
- Tự test
- Tự đóng gói zip
- Tự upload zip vào GitHub Release

## Ghi chú tệp nhị phân

`dist/*.zip` được tạo khi build/release và **không commit vào git** để tránh lỗi diff:
`Tệp nhị phân không được hỗ trợ`.

## Ghi chú tích hợp host plugin

`index.js` kỳ vọng host cung cấp:
- `patchMessageTransformer(transformerFn)`
- `getAttachmentText(attachment)`
- `downloadAttachment(attachment)`
- `logger(msg)` (optional)

Nếu host API khác, chỉ cần map lại trong `mountMessageEnhancer(api)`.
