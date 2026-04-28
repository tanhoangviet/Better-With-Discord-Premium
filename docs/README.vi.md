# Better With Discord Premium

Plugin mobile giúp Discord hiển thị code/text xịn hơn giống desktop.

## Kettu (v1.4.2) - URL dùng ngay

Kettu của bạn fetch JS trực tiếp từ URL source.

Dùng URL này để cài:

`https://raw.githubusercontent.com/tanhoangviet/Better-With-Discord-Premium/main/plugin/index.js`

JSON manifest đi kèm:

`https://raw.githubusercontent.com/tanhoangviet/Better-With-Discord-Premium/main/plugin/manifest.json`

## Fix website + fetch JS

- Build script giờ tạo endpoint `kettu-source.js` trên GitHub Pages.
- Đồng thời file JS có comment chứa link JSON để dễ copy.

## Fix pull conflict (không cần resolve tay)

`docs/` bây giờ là **build artifact** và đã ignore trong git.
Điều này tránh conflict khi pull giữa các lần build/deploy.

## Deploy

```bash
npm install
npm run build
```

Sau đó push lên `main/work`.
Workflow Pages sẽ build lại `docs/` và deploy lên `gh-pages` tự động.
