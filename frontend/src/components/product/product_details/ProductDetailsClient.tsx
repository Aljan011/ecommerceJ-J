"use client";

import { useState } from "react";
import DetailsContainer from "./DetailsContainer";
import type {
  IProduct,
  IVariantColor,
  IVariantColorPackPrice,
} from "@/types";

interface Props {
  product: IProduct;
}

export default function ProductDetailsClient({ product }: Props) {
  if (!product || !product.variants.length) return null;

  const firstVariant = product.variants[0];
  const colors: IVariantColor[] = firstVariant.colors || [];

  const defaultColor = colors[0]?.color.name ?? "";

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [qty, setQty] = useState(1);

  // Collect all packPrices from all colors
  const packPrices: IVariantColorPackPrice[] = colors.flatMap(
    (c) => c.packPrices ?? []
  );

  return (
    <DetailsContainer
      product={product}
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
      qty={qty}
      setQty={setQty}
      packPrices={packPrices}
    />
  );
}
