"use client";

import React from "react";
import ProductGallery from "./product_details/ProductGallery";
import ProductDetailsClient from "./product_details/ProductDetailsClient";
import type { IProduct as BaseProduct } from "@/types";

// Extend IProduct locally with detailed fields
interface IProductDetails extends BaseProduct {
  images: { id: string; url: string }[];
  commonUses: { id: string; text: string }[];
  features: { id: string; feature: string; description: string }[];
  faqs: { id: string; q: string; a: string }[];
  conclusion?: { id: string; text: string };
}

interface Props {
  product: IProductDetails;
}

export default function ProductContainer({ product }: Props) {
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="pd-container">
      {/* Breadcrumbs */}
      <nav className="pd-breadcrumbs">
        <a href="/">Home</a> <span>/</span>
        <a href="/products">Products</a> <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Gallery + Details */}
      <section className="pd-top">
        <ProductGallery
          images={
            product.images.length > 0
              ? product.images.map((i) => i.url)
              : product.imageUrl
              ? [product.imageUrl]
              : []
          }
        />
        <ProductDetailsClient product={product} />
      </section>

      {/* Dynamic Info Sections */}
      <section className="pd-info-sections">
        {/* Description */}
        {product.description && (
          <div className="pd-desc">
            <h2>Product Description</h2>
            <p>{product.description}</p>
          </div>
        )}

        {/* Features */}
        {product.features.length > 0 && (
          <div className="pd-specs">
            <h2>Specifications</h2>
            <table className="pd-features-table">
              <tbody>
                {product.features.map((f) => (
                  <tr key={f.id}>
                    <th>{f.feature}</th>
                    <td>{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Features</h3>
            <ul className="pd-features">
              {product.features.map((f) => (
                <li key={f.id}>{f.feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Uses */}
        {product.commonUses.length > 0 && (
          <div className="pd-common-uses">
            <h2>Common Uses</h2>
            <ul>
              {product.commonUses.map((c) => (
                <li key={c.id}>{c.text}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ */}
        {product.faqs.length > 0 && (
          <div className="pd-faq">
            <h2>FAQs</h2>
            {product.faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <strong>{faq.q}</strong>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* Conclusion */}
        {product.conclusion && (
          <div className="pd-conclusion">
            <h2>Conclusion</h2>
            <p>{product.conclusion.text}</p>
          </div>
        )}
      </section>
    </div>
  );
}