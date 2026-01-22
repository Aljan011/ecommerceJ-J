"use client"

import Link from "next/link";
import { useCategoryProductsQuery } from "@/lib";

interface Props {
  categoryId: string;
}

export default function CategoryProductList({ categoryId }: Props) {
  const { data, isLoading, isError } =
    useCategoryProductsQuery(categoryId);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products</p>;
  }

  if (!data || data.length === 0) {
    return <p>No products in this category</p>;
  }

  return (
    <ul className="space-y-3">
      {data.map((product) => (
        <li
          key={product.id}
          className="rounded border p-4"
        >
          <h2 className="font-medium">{product.name}</h2>

          {product.description && (
            <p className="text-sm text-gray-600">
              {product.description}
            </p>
          )}

          {/* Product detail navigation (NEXT STEP) */}
          <Link
            href={`/products/${product.id}`}
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
          >
            View product
          </Link>
        </li>
      ))}
    </ul>
  );
}
