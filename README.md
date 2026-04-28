# Better With Discord Premium

Plugin mobile giúp Discord hiển thị code/text xịn hơn giống desktop.

## Install chuẩn kiểu Revenge/Bunny/Vendetta

- **Plugin URL chuẩn:** `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium`
- **Manifest URL trực tiếp:** `https://tanhoangviet.github.io/Better-With-Discord-Premium/better-with-discord-premium/manifest.json`
- **Compatibility URL cũ:** `https://tanhoangviet.github.io/Better-With-Discord-Premium/manifest.json`

> Nếu app báo `Failed to fetch manifest`, hãy dán **Manifest URL trực tiếp** bên trên.

## Deploy lên GitHub

```bash
npm install
npm run build
```

`npm run build` sẽ:
- check + test plugin
- tạo file zip trong `dist/`
- build website Pages trong `docs/` theo cấu trúc plugin chuẩn (`/better-with-discord-premium`)

Sau đó push lên `main`, workflow Pages sẽ tự deploy.

## Output

- `plugin/manifest.json`: metadata plugin source
- `docs/better-with-discord-premium/manifest.json`: manifest public chuẩn cho client
- `dist/Better-with-Discord-Premium-mobile-plugin.zip`: file import plugin (được tạo khi build, không commit vào git)

Xem hướng dẫn chi tiết: `plugin/README.vi.md`.
