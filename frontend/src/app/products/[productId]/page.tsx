import ProductDetail from "@/components/product/ProductDetail";

interface Props {
    params: {productId: string};
}

export default function ProductPage({ params }: Props) {
  return (
    <main className="p-6">
      <ProductDetail productId={params.productId} />
    </main>
  );
}