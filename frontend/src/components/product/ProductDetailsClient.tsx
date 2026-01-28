"use client";

import { useState, useMemo } from "react";
import DetailsContainer from "./DetailsContainer";
import type { IProduct, IVariantColor } from "@/types";

interface Props {
  product: IProduct;
}

export default function ProductDetailsClient({ product }: Props) {
  if (!product) return null;

  const firstVariant = product.variants[0];
  const colors: IVariantColor[] = firstVariant?.colors || [];
  const defaultColor = colors[0]?.color.name || ""; // pick first color name

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [qty, setQty] = useState(1);

  // Selected variant color
  const selectedVariantColor: IVariantColor | undefined = useMemo(() => {
    return colors.find(c => c.color.name === selectedColor);
  }, [selectedColor, colors]);

  // Price and stock
  const pricePerUnit = selectedVariantColor?.price || 0;
  const stock = selectedVariantColor?.stock || 0;
  const totalPrice = pricePerUnit * qty;

  return (
    <DetailsContainer
      product={product}
      // TODO: Make dynamic later
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
      qty={qty}
      setQty={setQty}
      pricePerUnit={pricePerUnit}
      totalPrice={totalPrice}
      stock={stock} // optional for display
    />
  );
}
