"use client";

import type { CartItem } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type CartItemWithId = CartItem & { _id: string };

interface Props {
  cart: CartItemWithId[];
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subTotal: number;
  router: AppRouterInstance;
}

export default function CartContainer({
  cart,
  updateQty,
  removeItem,
  clearCart,
  subTotal,
  router,
}: Props) {
  return (
    <div className="cart-container">
      <div className="cart-page-title">
        <h1>Shopping Cart</h1>
        <span>{cart.length} Items</span>
      </div>

      <div className="cart-header">
        <div className="h-product">Product Details</div>
        <div className="h-price">Price</div>
        <div className="h-qty">Quantity</div>
        <div className="h-total">Total</div>
      </div>

      <div className="cart-items">
        {cart.map((it) => (
          <div key={it._id} className="cart-row">
            <div className="col-product">
              <div className="product-img">
                <div className="no-img" />
              </div>

              <div className="product-info">
                <h4 className="main-title">{it.productName}</h4>
                <p className="pack">Pack of: {it.packSize}</p>
                <p className="color">Color: {it.color}</p>
              </div>
            </div>

            <div className="col-price">NPR {it.pricePerUnit}</div>

            <div className="col-qty">
              <button
                className="qty-btn"
                onClick={() => updateQty(it._id, it.qty - 1)}
              >
                –
              </button>

              <input className="qty-input" value={it.qty} readOnly />

              <button
                className="qty-btn"
                onClick={() => updateQty(it._id, it.qty + 1)}
              >
                +
              </button>
            </div>

            <div className="col-total">
              <span className="total-amount">NPR {it.totalPrice}</span>

              <button className="delete-btn" onClick={() => removeItem(it._id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="order-summary">
          <div className="summary">
            <p className="subtotal-label">Subtotal:</p>
            <h2 className="subtotal-value">NPR {subTotal}</h2>

            <button
              onClick={() => router.push("/checkout")}
              className="cart-btn primary esewa-btn"
              style={{ backgroundColor: "#4CAF50" }}
            >
              <img src="/esewa/esewa-icon-large.webp" className="esewa-logo" />
              Proceed to Payment with eSewa
            </button>
          </div>
        </div>

        <div className="left-btns">
          <button onClick={() => router.push("/")} className="cart-btn-outline">
            Continue Shopping
          </button>

          <button onClick={clearCart} className="clear-cart">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
