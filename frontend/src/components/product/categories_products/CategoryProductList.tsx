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
  const { data, isLoading, isError } = useCategoryProductsQuery(categoryId);

  // // Debugging: log the query result
  // console.log("Category products query:", { data, isLoading, isError });

  if (isLoading) return <p className="products-loading">Loading products...</p>;
  if (isError) return <p className="products-error">Failed to load products</p>;
  
  // Ensure `data` is always an array
  const products: IProduct[] = Array.isArray(data) ? data : [];

  if (products.length === 0) return <p className="products-empty">No products in this category</p>;

  return (
    <section className="pb-products">
      <div className="pb-products-inner">
        <div className="pb-products-grid">
          {products.map((product: IProduct) => {
            // Defensive chaining
            const allPrices = product.variants?.flatMap(v => v.colors?.flatMap(c => c.packPrices?.map(p => p.price) ?? []) ?? []) ?? [];
            const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
            const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;

            return (
              <article className="pb-card" key={product.id}>
                {/* IMAGE */}
                <div className="pb-card-image">
                  <Image
                    src={product.imageUrl ?? "/placeholder.jpg"}
                    alt={product.name}
                    width={800}
                    height={520}
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 48vw, 30vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                </div>

                {/* BODY */}
                <div className="pb-card-body">
                  <h3 className="pb-card-title">{product.name}</h3>

                  {product.description && (
                    <p className="pb-card-desc">{product.description}</p>
                  )}

                  <div className="pb-card-actions">
                    <Link href={`/products/${product.id}`} className="pb-link">
                      View details
                    </Link>

                    {allPrices.length > 0 && (
                      <span className="pb-cta">
                        Rs {minPrice.toLocaleString()}
                        {minPrice !== maxPrice ? ` - Rs ${maxPrice.toLocaleString()}` : ""}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
