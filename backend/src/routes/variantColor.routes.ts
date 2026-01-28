import { Router } from "express";
import {
    getVariantColors,
    getVariantColor,
    createVariantColor,
    updateVariantColor,
    deleteVariantColor,
} from "../controllers/variantColor.controller.ts";

import { authMiddleware } from "../middlewares/auth.middleware.ts";
import adminMiddleware from "../middlewares/role.middleware.ts";

const router = Router();

// -------- PUBLIC --------
router.get("/variant/:variantId", getVariantColors);
router.get("/:id", getVariantColor);

// -------- ADMIN --------
router.post("/", authMiddleware, adminMiddleware, createVariantColor);
router.put("/:id", authMiddleware, adminMiddleware, updateVariantColor);
router.delete("/:id", authMiddleware, adminMiddleware, deleteVariantColor);

export const variantColorRoutes = router;