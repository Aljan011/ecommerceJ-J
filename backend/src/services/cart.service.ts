import prisma from "../config/prisma.ts";

type CartContext =
  | { userId: string }
  | { guestId: string };

const cartService = {
  // ============================
  // GET CART
  // ============================
  async getCart(context: CartContext) {
    if ("userId" in context) {
      return prisma.cartItem.findMany({
        where: { userId: context.userId },
        include: {
          variant: {
            include: {
              product: {
                include: { category: true },
              },
            },
          },
        },
      });
    } else {
      return prisma.cartItem.findMany({
        where: { guestId: context.guestId },
        include: {
          variant: {
            include: {
              product: {
                include: { category: true },
              },
            },
          },
        },
      });
    }
  },

  // ============================
  // ADD TO CART
  // ============================
  async addToCart(context: CartContext, variantId: string, quantity: number) {
    const variant = await prisma.variant.findUnique({
      where: { id: variantId },
    });
    if (!variant) throw new Error("Variant not found");

    if ("userId" in context) {
      const userId: string = context.userId;

      const existingItem = await prisma.cartItem.findUnique({
        where: { userId_variantId: { userId: context.userId!, variantId } },
      });

      if (existingItem) {
        return prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      }

      return prisma.cartItem.create({
        data: {
          userId,
          variantId,
          quantity,
          priceAtPurchase: variant.price,
        },
      });
    } else {
      const guestId = context.guestId!;

      const existingItem = await prisma.cartItem.findUnique({
        where: { guestId_variantId: { guestId, variantId } },
      });

      if (existingItem) {
        return prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      }

      return prisma.cartItem.create({
        data: {
          guestId,
          variantId,
          quantity,
          priceAtPurchase: variant.price,
        },
      });
    }
  },

  // ============================
  // UPDATE CART ITEM
  // ============================
  async updateCartItem(context: CartContext, variantId: string, quantity: number) {
    if (quantity <= 0) throw new Error("Quantity must be greater than zero");

    if ("userId" in context) {
      return prisma.cartItem.updateMany({
        where: { userId: context.userId, variantId },
        data: { quantity },
      });
    } else {
      return prisma.cartItem.updateMany({
        where: { guestId: context.guestId, variantId },
        data: { quantity },
      });
    }
  },

  // ============================
  // REMOVE ITEM
  // ============================
  async removeCartItem(context: CartContext, variantId: string) {
    if ("userId" in context) {
      return prisma.cartItem.deleteMany({
        where: { userId: context.userId, variantId },
      });
    } else {
      return prisma.cartItem.deleteMany({
        where: { guestId: context.guestId, variantId },
      });
    }
  },

  // ============================
  // CLEAR CART
  // ============================
  async clearCart(context: CartContext) {
    if ("userId" in context) {
      return prisma.cartItem.deleteMany({ where: { userId: context.userId } });
    } else {
      return prisma.cartItem.deleteMany({ where: { guestId: context.guestId } });
    }
  },

  // ============================
  // MERGE GUEST CART → USER
  // ============================
  async mergeGuestCartToUser(guestId: string, userId: string) {
    const guestItems = await prisma.cartItem.findMany({ where: { guestId } });

    for (const item of guestItems) {
      const existingUserItem = await prisma.cartItem.findFirst({
        where: { userId, variantId: item.variantId },
      });

      if (existingUserItem) {
        // Merge quantities
        await prisma.cartItem.update({
          where: { id: existingUserItem.id },
          data: { quantity: existingUserItem.quantity + item.quantity },
        });
        // Remove guest item
        await prisma.cartItem.delete({ where: { id: item.id } });
      } else {
        // Assign guest item to user
        await prisma.cartItem.update({
          where: { id: item.id },
          data: { userId, guestId: null },
        });
      }
    }
  },
};

export default cartService;
