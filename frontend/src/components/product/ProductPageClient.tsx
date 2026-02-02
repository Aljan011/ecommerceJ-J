"use client";

import { useProductByIdQuery } from "@/lib";
import ProductContainer from "./ProductContainer";
import type { IProduct } from "@/types";

interface Props {
  productId: string;
}

export default function ProductPageClient({ productId }: Props) {
  const { data, isLoading, isError } = useProductByIdQuery(productId);

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !data) return <p>Failed to load product</p>;

  return <ProductContainer product={data as IProduct} />;
}
