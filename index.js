import express from "express";
import routes from "./src/routes/index.js";
import connectDB from "./src/configs/db.js";
import notFoundHandler from "./src/middlewares/notFoundHandler.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import cors from "cors";
import { PORT } from "./src/configs/enviroments.js";
import jsonValid from "./src/middlewares/jsonInvalid.js";
import setupSwagger from "./src/configs/swaggerConfig.js";

const app = express();
app.use(express.json());

// Kết nối cơ sở dữ liệu
connectDB();

// CORS cho phép frontend truy cập
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Swagger docs
setupSwagger(app);

// Route chính
app.use("/api", routes);

// Middleware xử lý JSON không hợp lệ
app.use(jsonValid);

// Middleware xử lý route không tồn tại
app.use(notFoundHandler);

// Middleware xử lý lỗi chung
app.use(errorHandler);

// Khởi động server
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}/api`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
});

// Xử lý lỗi không xác định
process.on("unhandledRejection", (error) => {
  console.error(`❌ Unhandled Error: ${error.message}`);
  server.close(() => process.exit(1));
});
