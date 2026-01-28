import React from "react";
// import "@/styles"

import { apiClient } from "@/lib";
import { IProduct } from "@/types";

import ProductContainer from "@/components/product/ProductContainer";
import "@/styles/Category'sProducts/ProductDetails.css";

interface Props {
  params: {
    productId: string;
  };
}

export default async function ProductDetailPage ({ params }: Props) {
  const { productId } = params;

  let product: IProduct | null = null;

  try {
    const { data } = await apiClient.get(`/products/${productId}`);
    product = data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    // fallback static data
    product = {
      id: "sample-2",
      name: "Sample Packaging Box",
      description: "<p>This packaging box is sturdy, eco-friendly, and ideal for retail and shipping purposes.</p>",
      categoryId: "sample-cat",
      variants: [
        {
          id: "v1",
          name: "Default Variant",
          colors: [
            { id: "c1", price: 2250, stock: 50, color: { id: "col1", name: "Brown", hex: "#8B4513" } },
            { id: "c2", price: 2300, stock: 20, color: { id: "col2", name: "Pink", hex: "#FFC0CB" } },
          ],
        },
      ],
    };
  }

  const images = product.variants?.[0]?.colors.map(c => c.color?.hex ? "" : "" ) || [];

  return (
    <main className="pd-page">
      < ProductContainer product={product} />
    </main>
  )
}