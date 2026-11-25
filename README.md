# HRM PDF Server (hệ cũ)

Server phụ của HRM, tách riêng khỏi [backend chính](../HRM_backend/README.md). Hiện còn hai vai trò:

1. **Lưu ảnh cho trình soạn email** (`/api/image`) — frontend vẫn đang dùng khi chèn ảnh vào email mẫu.
2. **Lưu và phục vụ file PDF của chức năng Upload PDF cũ** (`/api/pdf`, `/uploads`). Chức năng này đã được thay bằng trang *Phân tích & kho CV* (file CV lưu trong backend chính, có xác thực). Server này chỉ còn để xem lại các file đã tải trước đây.

**Công nghệ:** Node.js, Express, MongoDB (Mongoose), Multer.

## Chạy

```bash
npm install
npm start          # nodemon app.js, mặc định cổng 3002
```

Cần file `.env` (xem `.env` hiện có làm mẫu, không commit giá trị thật):

| Biến | Ý nghĩa |
|---|---|
| `MONGODB_URL_SERVER` | Chuỗi kết nối MongoDB mà server dùng (`app.js`) |
| `MONGODB_URL_LOCAL` | Chuỗi kết nối cho môi trường local |
| `BACKEND_URI_SERVER`, `BACKEND_URI_LOCAL` | URL công khai của chính server này, dùng để tạo link file |
| `PORT` | Tùy chọn, mặc định `3002` |

## Endpoint

| Method | Đường dẫn | Mô tả |
|---|---|---|
| POST | `/api/image/upload_image` | Tải ảnh lên (trường `imageFile`; jpg, jpeg, png, gif, bmp, tiff, svg; tối đa 20 MB) |
| GET | `/api/image/get-image/:id` | Lấy ảnh |
| POST | `/api/pdf/upload_pdf` | Tải PDF (trường `pdfFile`) |
| GET | `/api/pdf/get-pdf/:id` | Lấy PDF theo id |
| GET | `/uploads/<tên-file>` | Phục vụ trực tiếp thư mục `uploads/` |

## Lưu ý bảo mật

- Server **chưa có xác thực**: ai có link đều xem được ảnh và PDF, và dữ liệu **không tách theo công ty**.
- Không dùng cho CV mới. File CV mới nên được tải qua trang *Phân tích & kho CV* của hệ thống chính.
- Cân nhắc: chuyển ảnh email sang backend chính rồi tắt server này; tải lại các PDF quan trọng vào kho CV mới.
