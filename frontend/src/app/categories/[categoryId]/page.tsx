import CategoryProductList from "@/components/product/CategoryProductList";

interface Props {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: Props) {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">
        Products
      </h1>

      <CategoryProductList categoryId={params.categoryId} />
    </main>
  );
}
