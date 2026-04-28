# Better With Discord Premium

Plugin mobile giúp Discord hiển thị code/text xịn hơn giống desktop.

## Deploy lên GitHub (repo của bạn)

Repo target: `https://github.com/tanhoangviet/Better-With-Discord-Premium`

```bash
npm install
npm run build
```

Nếu cần cập nhật lại link manifest (trong trường hợp đổi repo), chạy:

```bash
GITHUB_REPOSITORY="tanhoangviet/Better-With-Discord-Premium" npm run prepare:manifest
```

Sau đó commit + push, tạo GitHub Release để workflow tự đính kèm file zip.

## Output

- `plugin/manifest.json`: link update/source từ GitHub raw
- `dist/Better-with-Discord-Premium-mobile-plugin.zip`: file import plugin (được tạo khi build, không commit vào git)

Xem hướng dẫn chi tiết: `plugin/README.vi.md`.
