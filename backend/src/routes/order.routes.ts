import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.ts";
import adminOnly from "../middlewares/role.middleware.ts";

const router = Router();

// All routes require auth/guest ID
router.use(authMiddleware);

// Create order (user or guest)
router.post("/", createOrder);

// Get orders (user or guest)
router.get("/", getOrders);

// Get single order
router.get("/:orderId", getOrderById);

// Update order status (admin only)
router.put("/:orderId/status", adminOnly, updateOrderStatus);

export const orderRoutes = router;
