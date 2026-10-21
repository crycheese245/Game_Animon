# Kế hoạch tích hợp tài nguyên và tái cấu trúc mã nguồn

## 1. Cấu trúc thư mục đề xuất
```
/src
│   main.ts          # Điểm vào của trò chơi
│   classes.ts       # Định nghĩa lớp nhân vật, quái vật, v.v.
│   utils.ts         # Hàm tiện ích chung
│
├─/data
│   battleZones.ts
│   collisions.ts
│   … (các file dữ liệu khác)
│
├─/assets
│   ├─/images          # Sprite sheets, background, UI
│   │   sprite1.png
│   │   background.jpg
│   │   …
│   ├─/tiles           # Tilemap và tileset
│   │   overworld.map
│   │   tileset.png   # (sẽ tạo nếu cần)
│   └─/audio           # Âm thanh, nhạc nền (sẽ thêm sau)
│
/public
│   index.html
│   style.css
│   … (các file tĩnh khác)
```

## 2. Định vị và sao chép tài nguyên
- **Nguồn**: `E:\WorkSpace\Projects\vuong-quoc-sung-cau-vong_240x320`
- **Đích**: `src/assets/` theo cấu trúc trên.
- Sao chép toàn bộ ảnh, tilemap và âm thanh vào các thư mục con tương ứng.
- Đặt tên file **snake_case** (ví dụ: `sprite_sheet.png`, `overworld.map`).

## 3. Quy tắc đặt tên
| Loại | Quy tắc |
|------|----------|
| Thư mục | `snake_case` (images, tiles, audio) |
| File ảnh / tilemap | `snake_case` + mô tả (e.g., `character_sprite.png`) |
| Biến, hàm trong code | `camelCase` |
| Lớp | `PascalCase` |
| Module TypeScript | `.ts` (đổi từ `.js` hiện tại) |

## 4. Các module cần chỉnh sửa
| Module hiện tại | Thay đổi đề xuất |
|-----------------|------------------|
| `main.js` | Di chuyển sang `src/main.ts`; cập nhật đường dẫn tài nguyên tới `../assets/...`. |
| `classes.js` | Đổi thành `src/classes.ts`; chuyển sang kiểu TypeScript (định nghĩa interface, enum). |
| `data/*.js` | Đổi thành `src/data/*.ts`; export kiểu dữ liệu (`export const collisions = …`). |
| `index.html` | Cập nhật `<script>` để trỏ tới compiled `src/main.ts` (sử dụng bundler hoặc `tsc` → `dist`). |
| `style.css` | Không thay đổi, giữ trong `public/`. |

## 5. Các bước tiếp theo
1. Tạo thư mục `src/assets` và sao chép tài nguyên.
2. Chuyển đổi các file `.js` sang `.ts` và cập nhật import/export.
3. Cấu hình `tsconfig.json` (sẽ được thêm trong commit tiếp theo) để biên dịch sang `public/` hoặc `dist/`.
4. Kiểm tra lại các đường dẫn trong `index.html` và chạy thử trò chơi.

*Giả định*: Tài nguyên trong thư mục nguồn đã sẵn có và không cần xử lý đặc biệt trước khi sao chép.  

