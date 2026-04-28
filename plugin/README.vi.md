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
   - Hỗ trợ: `lua`, `js/javascript`, `ts/typescript`, `py/python/python3/py3`, `json`, `txt/text`.
   - Có normalize alias (`python -> py`, `python3 -> py`, `py3 -> py`, ...).

3. **Text file preview như desktop**
   - Khi attach các file `.txt`, `.lua`, `.js`, `.ts`, `.py` (hoặc MIME `text/*`), plugin render giao diện header giống desktop:
     - Tên file
     - Dung lượng file
     - Nút **Copy**
     - Nút **Download**

4. **Chống overflow payload lớn**
   - Giới hạn số block/code quá lớn để tránh lag/overflow trên mobile.
   - Block quá dài sẽ tự truncate an toàn.

## Kettu v1.4.2 - link chuẩn

- Source JS: `https://raw.githubusercontent.com/tanhoangviet/Better-With-Discord-Premium/main/plugin/index.js`
- Manifest JSON: `https://raw.githubusercontent.com/tanhoangviet/Better-With-Discord-Premium/main/plugin/manifest.json`

> Kettu fetch JS trực tiếp từ source URL, nên dùng link `.js` ở trên.

## Build/deploy

1. `npm install`
2. `npm run build`
3. push lên `main/work` để workflow deploy Pages.

## Tránh conflict khi pull

`docs/` là build artifact và đã ignore trong git để tránh conflict khi pull.
