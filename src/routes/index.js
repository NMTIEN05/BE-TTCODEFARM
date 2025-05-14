import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/authorController";

const routes = Router();

// Route test đơn giản để frontend gọi
routes.get("/message", (req, res) => {
  res.json({ message: "Kết nối thành công backend" });
});

// Route cho các controller
// Router cho category
routes.get("/categories", getCategories);
routes.get("/categories/:id", getCategoryById);
routes.post("/categories", createCategory);
routes.put("/categories/:id", updateCategory);
routes.delete("/categories/:id", deleteCategory);

// Router cho author
routes.get("/authors", getAuthors);
routes.get("/authors/:id", getAuthorById);
routes.post("/authors", createAuthor);
routes.put("/authors/:id", updateAuthor);
routes.delete("/authors/:id", deleteAuthor);

export default routes;
