import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cartService from "../services/cart.service.ts";

/**
 * Utility: resolve cart context
 * - Logged-in user → userId
 * - Guest → x-guest-id header (auto-generate if missing)
 */
function resolveCartContext(req: Request) {
    if (req.user) {
        return { userId: req.user.userId as number };
    }

    let guestId = req.headers["x-guest-id"];

    if (!guestId || typeof guestId !== "string") {
        // Auto-generate guestId for first-time guest
        guestId = uuidv4();
        // Attach it to request so controller can return it
        (req as any).generatedGuestId = guestId;
    }

    return { guestId };
}

// ============================
// GET CART
// ============================
export const getCart = async (req: Request, res: Response) => {
    try {
        const context = resolveCartContext(req);
        const cart = await cartService.getCart(context);

        const response: any = { cart };
        if ((req as any).generatedGuestId) {
            response.guestId = (req as any).generatedGuestId;
        }

        res.json(response);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// ============================
// ADD TO CART
// ============================
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { variantId, quantity } = req.body;

        if (!variantId || !quantity || quantity <= 0) {
            return res
                .status(400)
                .json({ message: "variantId and valid quantity required" });
        }

        const context = resolveCartContext(req);
        const item = await cartService.addToCart(
            context,
            Number(variantId),
            Number(quantity)
        );

        const response: any = { item };
        if ((req as any).generatedGuestId) {
            response.guestId = (req as any).generatedGuestId;
        }

        res.status(201).json(response);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// ============================
// UPDATE CART ITEM
// ============================
export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { variantId, quantity } = req.body;

        if (!variantId || !quantity || quantity <= 0) {
            return res
                .status(400)
                .json({ message: "variantId and valid quantity required" });
        }

        const context = resolveCartContext(req);
        await cartService.updateCartItem(
            context,
            Number(variantId),
            Number(quantity)
        );

        res.json({ message: "Cart item updated" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// ============================
// REMOVE CART ITEM
// ============================
export const removeCartItem = async (req: Request, res: Response) => {
    try {
        const variantId = Number(req.params.variantId);

        if (!variantId) {
            return res.status(400).json({ message: "variantId required" });
        }

        const context = resolveCartContext(req);
        await cartService.removeCartItem(context, variantId);

        res.json({ message: "Item removed from cart" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// ============================
// CLEAR CART
// ============================
export const clearCart = async (req: Request, res: Response) => {
    try {
        const context = resolveCartContext(req);
        await cartService.clearCart(context);
        res.json({ message: "Cart cleared" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// ============================
// MERGE GUEST CART → USER
// ============================
export const mergeGuestCart = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const guestId = req.headers["x-guest-id"];

        if (!guestId || typeof guestId !== "string") {
            return res.status(400).json({ message: "Guest ID missing" });
        }

        await cartService.mergeGuestCartToUser(
            guestId,
            req.user.userId as number
        );

        res.json({ message: "Guest cart merged successfully" });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
