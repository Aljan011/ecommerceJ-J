"use client";

import Image from "next/image";
import Link from "next/link";
import { useCategoryListQuery } from "@/lib";
import type { ICategory } from "@/types";

import "@/styles/ClientDashboard/OurServices/index.css"

export default function CategoryProductList() {
  const { data: categories, isLoading } = useCategoryListQuery();

  if (isLoading) {
    return <p className="hm-loading">Loading categories...</p>;
  }

  return (
    <section className="hm-products">
      <div className="hm-container">
        <h2 className="hm-section-title">Our Services</h2>

        <div className="hm-products-grid">
          {categories?.map((category) => (
            <div key={category.id} className="hm-product-category">
              <div className="hm-category-image">
                <Image
                  src={category.imageUrl }
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="hm-category-img"
                />
              </div>

              <div className="hm-category-content">
                <h3 className="hm-category-title">
                  {category.name}
                </h3>

                <p className="hm-category-desc">
                  {category.description}
                </p>

                <Link
                  href={`/categories/${category.id}`}
                  className="hm-category-link"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
