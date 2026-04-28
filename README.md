# Better With Discord Premium

Plugin mobile giúp Discord hiển thị code/text xịn hơn giống desktop.

## Kettu (v1.4.2) - URL đúng để cài

Bạn đang dùng **Kettu v1.4.2** và màn hình lỗi của bạn là do Kettu đang fetch **JS trực tiếp** từ URL bạn nhập.

Vì vậy phải dán URL `.js` (không phải URL folder):

`https://raw.githubusercontent.com/tanhoangviet/Better-With-Discord-Premium/main/docs/better-with-discord-premium/kettu-source.js`

## URL khác (nếu cần)

- Manifest cho Pages: `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium/manifest.json`
- Plugin folder chuẩn Revenge/Bunny: `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium`

## Fix workflow `.yml`

Workflow Pages đã được đổi sang deploy bằng nhánh `gh-pages` (ổn định hơn trong nhiều repo) thay vì phụ thuộc deploy artifact kiểu Pages Actions.

## Deploy lên GitHub

```bash
npm install
npm run build
```

`npm run build` sẽ:
- check + test plugin
- tạo file zip trong `dist/`
- build website Pages trong `docs/` theo cấu trúc plugin chuẩn (`/better-with-discord-premium`)

Sau đó push lên `main` (hoặc `work`), workflow Pages sẽ tự deploy.

## Output

- `docs/better-with-discord-premium/manifest.json`: manifest cho github.io
- `docs/better-with-discord-premium/kettu-manifest.json`: manifest fallback tối ưu cho Kettu
- `dist/Better-with-Discord-Premium-mobile-plugin.zip`: file import plugin (được tạo khi build, không commit vào git)

Xem hướng dẫn chi tiết: `plugin/README.vi.md`.
