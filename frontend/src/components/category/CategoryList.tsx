// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCategoryListQuery } from "@/lib";

// import "@/styles/ClientDashboard/OurServices/index.css"

// export default function CategoryProductList() {
//   const { data: categories, isLoading } = useCategoryListQuery();

//   if (isLoading) {
//     return <p className="hm-loading">Loading categories...</p>;
//   }

//   return (
//     <section className="hm-products">
//       <div className="hm-container">
//         <h2 className="hm-section-title">Our Services</h2>

//         <div className="hm-products-grid">
//           {categories?.map((category) => (
//             <div key={category.id} className="hm-product-category">
//               <div className="hm-category-image">
//                 <Image
//                   // src={category.imageUrl} // Uncomment and use actual image URL when available
//                   src="/placeholder-category.jpg" // Placeholder image
//                   alt={category.name}
//                   fill
//                   sizes="(max-width: 768px) 100vw, 33vw"
//                   className="hm-category-img"
//                 />
//               </div>

//               <div className="hm-category-content">
//                 <h3 className="hm-category-title">
//                   {category.name}
//                 </h3>

//                 <p className="hm-category-desc">
//                   {category.description}
//                 </p>

//                 <Link
//                   href={`/categories/${category.id}`}
//                   className="hm-category-link"
//                 >
//                   View Products
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useAllProductsQuery } from "@/lib";

import "@/styles/ClientDashboard/OurServices/index.css";

export default function CategoryProductList() {
  const { data: products, isLoading } = useAllProductsQuery();

  if (isLoading) {
    return <p className="hm-loading">Loading products...</p>;
  }

  return (
    <section className="hm-products">
      <div className="hm-container">
        <h2 className="hm-section-title">Our Products</h2>

        <div className="hm-products-grid">
          {products?.map((product) => (
            <div key={product.id} className="hm-product-category">
              {/* IMAGE */}
              <div className="hm-category-image">
                <Image
                  src={product.imageUrl || "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="hm-category-img"
                />
              </div>

              {/* CONTENT */}
              <div className="hm-category-content">
                <h3 className="hm-category-title">
                  {product.name}
                </h3>

                <p className="hm-category-desc">
                  {product.description || "High quality packaging product"}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="hm-category-link"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
