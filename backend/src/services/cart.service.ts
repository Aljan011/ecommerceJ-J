import prisma from "../config/prisma.ts";

type CartContext =
  | { userId: string }
  | { guestId: string };

const cartService = {
  // ============================
  // GET CART
  // ============================
  async getCart(context: CartContext) {
    const where = "userId" in context ? { userId: context.userId } : { guestId: context.guestId };

    return prisma.cartItem.findMany({
      where,
      include: {
        variantColor: {
          include: {
            color: true,
            variant: {
              include: {
                product: {
                  include: { category: true },
                },
              },
            },
          },
        },
      },
    });

  },

  // ============================
  // ADD TO CART
  // ============================
  async addToCart(context: CartContext, variantColorId: string, quantity: number) {
    const variantColor = await prisma.variantColor.findUnique({
      where: { id: variantColorId },
      include: { variant: true, color: true },
    });

    if (!variantColor) throw new Error("Variant color not found");
    if (variantColor.stock < quantity) throw new Error("Insufficient stock");

    if ("userId" in context) {
      const existingItem = await prisma.cartItem.findUnique({
        where: { userId_variantColorId: { userId: context.userId, variantColorId } },
      });

      if (existingItem) {
        return prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      }

      return prisma.cartItem.create({
        data: {
          userId: context.userId,
          variantColorId,
          quantity,
          priceAtPurchase: variantColor.price,
        },
      });
    } else {
      const existingItem = await prisma.cartItem.findUnique({
        where: { guestId_variantColorId: { guestId: context.guestId!, variantColorId } },
      });

      if (existingItem) {
        return prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
        });
      }

      return prisma.cartItem.create({
        data: {
          guestId: context.guestId!,
          variantColorId,
          quantity,
          priceAtPurchase: variantColor.price,
        },
      });
    }
  },

  // ============================
  // UPDATE CART ITEM
  // ============================
  async updateCartItem(context: CartContext, variantColorId: string, quantity: number) {
    if (quantity <= 0) throw new Error("Quantity must be greater than zero");

    if ("userId" in context) {
      return prisma.cartItem.updateMany({
        where: { userId: context.userId, variantColorId },
        data: { quantity },
      });
    } else {
      return prisma.cartItem.updateMany({
        where: { guestId: context.guestId, variantColorId },
        data: { quantity },
      });
    }
  },

  // ============================
  // REMOVE ITEM
  // ============================
  async removeCartItem(context: CartContext, variantColorId: string) {
    if ("userId" in context) {
      return prisma.cartItem.deleteMany({
        where: { userId: context.userId, variantColorId },
      });
    } else {
      return prisma.cartItem.deleteMany({
        where: { guestId: context.guestId, variantColorId },
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
        where: { userId, variantColorId: item.variantColorId },
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
