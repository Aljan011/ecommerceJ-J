"use client";

import type { IProduct, CartItem, IVariantColorPackPrice } from "@/types";
import { useMemo, useState } from "react";

interface Props {
  product: IProduct;
  packPrices: IVariantColorPackPrice[]; // all packPrices for all colors
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  qty: number;
  setQty: (qty: number) => void;
}

export default function DetailsContainer({
  product,
  packPrices,
  selectedColor,
  setSelectedColor,
  qty,
  setQty,
}: Props) {
  const variant = product.variants[0];
  const colors = variant.colors;

  // Selected color object
  const selectedVariantColor = useMemo(() => {
    return colors.find((c) => c.color.name === selectedColor);
  }, [colors, selectedColor]);

  // Pack sizes for selected color
  const availablePackPrices = useMemo(() => {
    if (!selectedVariantColor) return [];
    return selectedVariantColor.packPrices || [];
  }, [selectedVariantColor]);

  const [selectedPackSize, setSelectedPackSize] = useState<number | null>(
    availablePackPrices[0]?.packSize ?? null
  );

  const selectedPack = useMemo(() => {
    return availablePackPrices.find((p) => p.packSize === selectedPackSize);
  }, [availablePackPrices, selectedPackSize]);

  const pricePerUnit = selectedPack?.price ?? 0;
  const totalPrice = pricePerUnit * qty;

  const handleAddToCart = () => {
    if (!selectedVariantColor || !selectedPack) return;

    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      categoryName: product.categoryId, // can replace with actual category name if available
      color: selectedVariantColor.color.name,
      packSize: selectedPack.packSize,
      qty,
      pricePerUnit: selectedPack.price,
      totalPrice,
    };

    const existing = localStorage.getItem("cart");
    const cart: CartItem[] = existing ? JSON.parse(existing) : [];

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  return (
    <div className="pd-details">
      <h1 className="pd-title">{product.name}</h1>
      <p className="pd-short">
        {product.description ?? "High quality packaging product"}
      </p>

      {/* COLORS */}
      <div className="pd-colors">
        {colors.map((c) => (
          <button
            key={c.id}
            className={`pd-color-btn ${
              selectedColor === c.color.name ? "active" : ""
            }`}
            style={{ backgroundColor: c.color.hex }}
            onClick={() => {
              setSelectedColor(c.color.name);
              setSelectedPackSize(
                availablePackPrices[0]?.packSize ?? null
              ); // reset pack size on color change
            }}
          />
        ))}
      </div>

      {/* PACK SIZES */}
      {selectedVariantColor && (
        <div className="pd-pack-sizes">
          {availablePackPrices.map((p) => (
            <button
              key={p.id}
              className={`pd-pack-btn ${
                selectedPackSize === p.packSize ? "active" : ""
              }`}
              onClick={() => setSelectedPackSize(p.packSize)}
            >
              {p.packSize} pcs
            </button>
          ))}
        </div>
      )}

      {/* QUANTITY */}
      <div className="pd-qty">
        <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
        <input readOnly value={qty} />
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      {/* PRICE */}
      {selectedPack && (
        <div className="pd-total">
          <div>Price per pack: Rs {pricePerUnit}</div>
          <div>Total: Rs {totalPrice}</div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="pd-actions-row">
        <button
          className="pd-btn pd-add-to-cart"
          disabled={!selectedPack}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
