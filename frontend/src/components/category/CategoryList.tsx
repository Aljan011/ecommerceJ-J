import Link from "next/link";
import { useCategoryListQuery } from "@/lib";

export default function CategoryList() {
  const { data, isLoading, isError } = useCategoryListQuery();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Failed to load categories</p>;
  }

  return (
    <ul className="space-y-2">
      {data?.map((category) => (
        <li key={category.id}>
          <Link
            href={`/categories/${category.id}`}
            className="block rounded border p-3 hover:bg-black-50"
          >
            <span className="font-medium">{category.name}</span>
            <span className="font-normal">{category.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
