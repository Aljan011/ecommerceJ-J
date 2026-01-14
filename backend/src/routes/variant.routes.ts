import { Router } from "express";
import {
  getVariants,
  getVariant,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../controllers/variant.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";
import adminMiddleware from "../middlewares/role.middleware.ts";

const router = Router();

// -------- PUBLIC --------
router.get("/product/:productId", getVariants);
router.get("/:id", getVariant);

// -------- ADMIN --------
router.post("/", authMiddleware, adminMiddleware, createVariant);
router.put("/:id", authMiddleware, adminMiddleware, updateVariant);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVariant);

export const variantRoutes = router;
