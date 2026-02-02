"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CartContainer from "@/components/cart/CartContainer";
import "@/styles/cart/page.css";

import type { CartItem } from "@/types";

type CartItemWithId = CartItem & { _id: string };

export default function CartClient() {
  const [cart, setCart] = useState<CartItemWithId[]>([]);
  const router = useRouter();

  // load cart from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("cart");
    const parsed: CartItem[] = raw ? JSON.parse(raw) : [];

    // attach stable ids for UI
    const withIds = parsed.map((item, index) => ({
      ...item,
      _id: `${item.productId}-${item.color}-${item.packSize}-${index}`,
    }));

    setCart(withIds);
  }, []);

  const save = (next: CartItemWithId[]) => {
    setCart(next);
    localStorage.setItem(
      "cart",
      JSON.stringify(next.map(({ _id, ...rest }) => rest)),
    );
  };

  const updateQty = (_id: string, newQty: number) => {
    if (newQty < 1) return;

    const next = cart.map((item) =>
      item._id === _id
        ? {
            ...item,
            qty: newQty,
            totalPrice: item.pricePerUnit * newQty,
          }
        : item,
    );

    save(next);
  };

  const removeItem = (_id: string) => {
    save(cart.filter((item) => item._id !== _id));
  };

  const clearCart = () => save([]);

  const subTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  if (!cart.length) {
    return (
      <div className="cart-container">
        <h1> Your Cart</h1>
        <p>Your cart is empty.</p>
        <button
          onClick={() => router.push("/products")}
          className="cart-btn primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  return (
    <CartContainer
      cart={cart}
      updateQty={updateQty}
      removeItem={removeItem}
      clearCart={clearCart}
      subTotal={subTotal}
      router={router}
    />
  );
}
