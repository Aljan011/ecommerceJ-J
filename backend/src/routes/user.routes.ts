import { Router } from "express";
import { getMe, updateMe, deleteMe } from "../controllers/user.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { requireRole } from "../middlewares/role.middleware.ts";

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// Logged-in USER or ADMIN
router.get(
  "/me",
  requireRole(["USER", "ADMIN"]),
  getMe
);

router.put(
  "/me",
  requireRole(["USER", "ADMIN"]),
  updateMe
);

//  Delete own account
router.delete(
  "/me",
  requireRole(["USER", "ADMIN"]),
  deleteMe
);

export const  userRoutes = router;
