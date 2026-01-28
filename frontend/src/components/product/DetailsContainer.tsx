'use client';

import type { IProduct, IVariantColor } from "@/types";

interface Props {
  product: IProduct;                 // full product
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  qty: number;
  setQty: (qty: number) => void;
  pricePerUnit: number;
  totalPrice: number;
  stock?: number;                    // optional for display
}

export default function DetailsContainer({
  product,
  selectedColor,
  setSelectedColor,
  qty,
  setQty,
  pricePerUnit,
  totalPrice,
  stock,
}: Props) {
  const firstVariant = product.variants[0];
  const colors: IVariantColor[] = firstVariant?.colors || [];

  return (
    <div className="pd-details">
      <h1 className="pd-title">{product.name}</h1>

      {/* TODO: Replace with dynamic short description later */}
      <p className="pd-short">This is a short description (static for now).</p>

      {/* Price */}
      <div className="pd-price-block">
        <span className="pd-price">Rs {pricePerUnit}</span>
        {stock !== undefined && <span className="pd-total-pieces">{stock} pcs available</span>}
      </div>

      {/* Color selection */}
      <div className="pd-colors">
        {colors.map((c) => (
          <button
            key={c.id}
            className={`pd-color-btn ${selectedColor === c.color.name ? "active" : ""}`}
            style={{ backgroundColor: c.color.hex }}
            onClick={() => setSelectedColor(c.color.name)}
          />
        ))}
      </div>

      {/* Quantity selector */}
      <div className="pd-actions-row">
        <div className="pd-qty">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
          <input type="text" readOnly value={qty} />
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>

      {/* Total price */}
      <div className="pd-total-pieces">Total: Rs {totalPrice}</div>

      {/* Buttons - static placeholders for now */}
      <div className="pd-actions-row">
        <button className="pd-btn pd-add-to-cart">Add to Cart</button>
        <button className="pd-btn pd-buy-now">Buy Now</button>
      </div>
    </div>
  );
}
