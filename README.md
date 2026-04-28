# Better With Discord Premium

Plugin mobile giúp Discord hiển thị code/text xịn hơn giống desktop.

## Install từ GitHub Pages (khuyên dùng)

- Base URL: `https://tanhoangviet.github.io/Better-With-Discord-Premium/`
- Manifest URL (nếu app yêu cầu trực tiếp): `https://tanhoangviet.github.io/Better-With-Discord-Premium/manifest.json`

> Lỗi trước đó `Failed to fetch manifest` xảy ra vì chưa có `manifest.json` trên GitHub Pages.

## Deploy lên GitHub

```bash
npm install
npm run build
```

`npm run build` sẽ:
- check + test plugin
- tạo file zip trong `dist/`
- build website Pages trong `docs/`

Sau đó push lên `main`, workflow Pages sẽ tự deploy.

## Output

- `plugin/manifest.json`: metadata plugin cho repo source
- `docs/manifest.json`: manifest public để client load qua `github.io`
- `dist/Better-with-Discord-Premium-mobile-plugin.zip`: file import plugin (được tạo khi build, không commit vào git)

Xem hướng dẫn chi tiết: `plugin/README.vi.md`.
idk
