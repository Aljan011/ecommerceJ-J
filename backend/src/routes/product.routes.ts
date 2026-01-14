import { Router } from "express";
import {
  getProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/product.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";
import adminOnly from "../middlewares/role.middleware.ts";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/category/:categoryId", getProductsByCategory);

// Admin routes
router.post("/", authMiddleware, adminOnly, createProduct);
router.put("/:id", authMiddleware, adminOnly, updateProduct);
router.delete("/:id", authMiddleware, adminOnly, deleteProduct);

export const productRoutes = router;
