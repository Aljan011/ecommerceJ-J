"use client";

import React from "react";
import ProductGallery from "./product_details/ProductGallery";
import ProductDetailsClient from "./product_details/ProductDetailsClient";
import type { IProduct } from "@/types";

interface Props {
  product: IProduct;
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
        <ProductGallery images={product.imageUrl ? [product.imageUrl] : []} />
        <ProductDetailsClient product={product} />
      </section>

      {/* STATIC INFO SECTIONS */}
      <section className="pd-info-sections">
        <div className="pd-desc">
          <h2>Product Description</h2>
          {/* TODO: Replace with dynamic product description */}
          <p>
            This is a placeholder description. Replace this with dynamic product description later.
          </p>
        </div>

        <div className="pd-specs">
          <h2>Specifications</h2>
          <table className="pd-features-table">
            <tbody>
              {/* TODO: Replace with dynamic specifications */}
              <tr>
                <th>Material</th>
                <td>Corrugated cardboard</td>
              </tr>
              <tr>
                <th>Weight capacity</th>
                <td>Up to 10kg</td>
              </tr>
              <tr>
                <th>Dimensions</th>
                <td>Various sizes</td>
              </tr>
            </tbody>
          </table>

          <h3>Features</h3>
          <ul className="pd-features">
            {/* TODO: Replace with dynamic features */}
            <li>Strong cardboard material</li>
            <li>Eco-friendly</li>
            <li>Multiple sizes available</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
