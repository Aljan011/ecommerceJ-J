"use client";

import Image from "next/image";
import { useCategoryByIdQuery } from "@/lib";

import "@/styles/Category'sProducts/HeroSection.css"

interface Props {
  categoryId: string;
}

export default function CategoryHero({ categoryId }: Props) {
  const { data: category, isLoading, isError } =
    useCategoryByIdQuery(categoryId);

  if (isLoading) {
    return <p className="hm-loading">Loading category...</p>;
  }

  if (isError || !category) {
    return <p className="hm-error">Failed to load category</p>;
  }

  return (
    <section className="pb-hero" aria-labelledby="category-hero-title">
      <div className="pb-hero-inner">
        {/* TEXT */}
        <div className="pb-hero-text">
          <h1 id="category-hero-title" className="pb-hero-title">
            {category.name}
          </h1>

          {category.description && (
            <p className="pb-hero-sub">
              {category.description}
            </p>
          )}

          <a href="#category-products" className="pb-hero-cta">
            Explore Products
          </a>
        </div>

        {/* IMAGE */}
        <div
          className="pb-hero-img"
          role="img"
          aria-label={`${category.name} category image`}
        >
          <Image
            src={category.imageUrl || "/placeholder.jpg"}
            alt={category.name}
            width={700}
            height={490}
            priority
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 14,
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </section>
  );
}
