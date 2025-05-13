import { Router } from "express";

const routes = Router();

// Route test đơn giản để frontend gọi
routes.get("/message", (req, res) => {
  res.json({ message: "Kết nối thành công backend " });
});



export default routes;
