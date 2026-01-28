import CategoryHero from "@/components/category/CategoryHero";
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

      <CategoryHero categoryId={categoryId} />
      <CategoryProductList categoryId={categoryId} />
    </main>
  );
}

