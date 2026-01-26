"use client"

import { useProductByIdQuery } from "@/lib";
import "@/app/styles/clientDashboard/productdetails.css"

interface Props {
  productId: string;
}

export default function ProductDetail({ productId }: Props) {
  const { data: product, isLoading, isError } =
    useProductByIdQuery(productId);

  if (isLoading) return <p className="product-loading">Loading product</p>;
  if (isError || !product) return <p className="product-error">Failed to load product</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="product-header">
          <h1 className="product-title">{product.name}</h1>

          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
        </div>

        <div className="variants-section">
          <h2 className="variants-title">Available Variants</h2>

          {product.variants.length === 0 && (
            <p className="variants-empty">No variants available</p>
          )}

          {product.variants.length > 0 && (
            <div className="variants-grid">
              {product.variants.map((variant) => {
                const stockStatus = variant.stock > 10 ? 'in-stock' :
                  variant.stock > 0 ? 'low-stock' :
                    'out-of-stock';

                return (
                  <div
                    key={variant.id}
                    className="variant-card"
                  >
                    <div className="variant-info">
                      <p className="variant-price">{variant.price}</p>
                      <p className="variant-stock">
                        <span className={`stock-indicator ${stockStatus}`}></span>
                        <span>Stock: <strong>{variant.stock}</strong></span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}