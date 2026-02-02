import ProductPageClient from "@/components/product/ProductPageClient";
import "@/styles/Category'sProducts/ProductDetails.css";

interface Props {
  params: {
    productId: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;

  return (
    <main className="pd-page">
      <ProductPageClient productId={productId} />
    </main>
  );
}
