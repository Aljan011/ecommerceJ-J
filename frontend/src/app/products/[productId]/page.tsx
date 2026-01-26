import ProductDetail from "@/components/product/ProductDetail";

interface Props {
    params: {productId: string};
}

export default async function ProductPage({ params }: Props) {
    const { productId } = await params;
  return (
    <main className="p-6">
      <ProductDetail productId={productId} />
    </main>
  );
}