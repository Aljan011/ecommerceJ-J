"use client";

import Link from "next/link";
import Image from "next/image";

import { useCategoryProductsQuery } from "@/lib";
import type { IProduct } from "@/types";

import "@/styles/Category'sProducts/index.css";

interface Props {
  categoryId: string;
}

export default function CategoryProductList({ categoryId }: Props) {
  const { data, isLoading, isError } =
    useCategoryProductsQuery(categoryId);

  if (isLoading) {
    return <p className="products-loading">Loading products...</p>;
  }

  if (isError) {
    return <p className="products-error">Failed to load products</p>;
  }

  if (!data || data.length === 0) {
    return <p className="products-empty">No products in this category</p>;
  }

  return (
    <section className="pb-products">
      <div className="pb-products-inner">
        {/* <h2 className="pb-section-title">Products</h2> */}

        <div className="pb-products-grid">
          {data.map((product: IProduct) => (
            <article className="pb-card" key={product.id}>
              {/* IMAGE */}
              <div className="pb-card-image">
                <Image
                  // src={product.imageUrl || "/placeholder.jpg"} // Uncomment and use actual image URL when available
                  src="/placeholder.jpg" // Placeholder image
                  alt={product.name}
                  width={800}
                  height={520}
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 48vw, 30vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* BODY */}
              <div className="pb-card-body">
                <h3 className="pb-card-title">{product.name}</h3>

                {product.description && (
                  <p className="pb-card-desc">
                    {product.description}
                  </p>
                )}

                <div className="pb-card-actions">
                  <Link
                    href={`/products/${product.id}`}
                    className="pb-link"
                  >
                    View details
                  </Link>

                  {/* Optional price display */}
                  {product.variants?.[0]?.price && (
                    <span className="pb-cta">
                      Rs {product.variants[0].price} - {product.variants[1].price}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
