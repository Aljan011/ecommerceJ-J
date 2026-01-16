import { Router } from "express";
import { getAdminStats } from "../controllers/admin.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import adminOnly from "../middlewares/role.middleware.ts";

const router = Router();

router.get("/stats", authMiddleware, adminOnly, getAdminStats);

export const adminRoutes = router;
