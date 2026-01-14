import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  mergeGuestCart,
} from "../controllers/cart.controller.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";

const router = Router();

/**
 * NOTE:
 * - Cart is accessible to BOTH guests and logged-in users
 * - authMiddleware is applied ONLY where user identity is required
 */


// PUBLIC / GUEST CART ROUTES


// Get cart (guest or user)
router.get("/", getCart);

// Add item to cart
router.post("/", addToCart);

// Update quantity
router.put("/", updateCartItem);

// Remove single item
router.delete("/:variantId", removeCartItem);

// Clear entire cart
router.delete("/", clearCart);


// AUTHENTICATED ONLY
// Merge guest cart → user cart (after login)
router.post("/merge", authMiddleware, mergeGuestCart);

export const cartRoutes = router;
