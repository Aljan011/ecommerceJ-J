import CategoryProductList from "@/components/product/CategoryProductList";

interface Props {
  params: {
    categoryId: string;
  };
}

export default async function CategoryPage({ params }: Props) {
    const { categoryId } = await params;
  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-semibold">
        Products
      </h1>

      <CategoryProductList categoryId={categoryId} />
    </main>
  );
}

