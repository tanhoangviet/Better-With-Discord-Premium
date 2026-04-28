# Better With Discord Premium

Plugin mobile giúp Discord hiển thị code/text xịn hơn giống desktop.

## Kettu (v1.4.2) - URL nên dùng ngay

Bạn đang dùng **Kettu v1.4.2**.

Dùng URL này để add plugin (ổn định nhất, không phụ thuộc Pages):

`https://raw.githubusercontent.com/tanhoangviet/Better-With-Discord-Premium/main/docs/better-with-discord-premium/kettu-manifest.json`

## Install chuẩn kiểu Revenge/Bunny/Vendetta

- **Plugin URL chuẩn:** `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium`
- **Manifest URL trực tiếp:** `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium/manifest.json`

> Nếu thấy `Page not found`, thường là do GitHub Pages chưa bật/chưa deploy xong. Với Kettu thì dùng `kettu-manifest.json` ở trên để test ngay.

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
