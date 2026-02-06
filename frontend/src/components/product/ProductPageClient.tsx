"use client";

import ProductContainer from "./ProductContainer";
import type { IProduct as BaseProduct } from "@/types";

// Extend IProduct locally with detailed fields
interface IProductDetails extends BaseProduct {
  images: { id: string; url: string }[];
  commonUses: { id: string; text: string }[];
  features: { id: string; feature: string; description: string }[];
  faqs: { id: string; q: string; a: string }[];
  conclusion?: { id: string; text: string };
}

import { useProductByIdQuery } from "@/lib";

interface Props {
  productId: string;
}

export default function ProductPageClient({ productId }: Props) {
  const { data, isLoading, isError } = useProductByIdQuery(productId);

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !data) return <p>Failed to load product</p>;

  // Cast to extended type
  const product = data as IProductDetails;

  return <ProductContainer product={product} />;
}