"use client"

import Link from "next/link";
import { useCategoryProductsQuery } from "@/lib";
import "@/app/styles/clientDashboard/categoryproductlist.css"; 

interface Props {
  categoryId: string;
}

export default function CategoryProductList({ categoryId }: Props) {
  console.log("categoryid", categoryId)

  const { data, isLoading, isError } =
    useCategoryProductsQuery(categoryId);

  console.log("category products data", data);

  if (isLoading) {
    return <p className="products-loading">Loading products</p>;
  }

  if (isError) {
    return <p className="products-error">Failed to load products</p>;
  }

  if (!data || data.length === 0) {
    return <p className="products-empty">No products in this category</p>;
  }

  return (
    <ul className="products-list">
      {data.map((product) => (
        <li
          key={product.id}
          className="product-item"
        >
          <div className="product-card">
            <h2 className="product-name">{product.name}</h2>

            {product.description && (
              <p className="product-description">
                {product.description}
              </p>
            )}

            <Link
              href={`/products/${product.id}`}
              className="product-link"
            >
              View product
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}