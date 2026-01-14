import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getCategoryProducts } from "../controllers/category.controller.ts";
import adminOnly from "../middlewares/role.middleware.ts";

const router = Router();

// Public routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.get("/:id/products", getCategoryProducts);

// Admin routes
router.post("/", authMiddleware, adminOnly, createCategory);
router.put("/:id", authMiddleware, adminOnly, updateCategory);
router.delete("/:id", authMiddleware, adminOnly, deleteCategory);

export const categoryRoutes = router;