import Link from "next/link";
import { useCategoryListQuery } from "@/lib";
import "@/app/styles/clientDashboard/categorylisting.css"; 

export default function CategoryList() {
  const { data, isLoading, isError } = useCategoryListQuery();

  if (isLoading) {
    return <p className="category-loading">Loading categories</p>;
  }

  if (isError) {
    return <p className="category-error">Failed to load categories</p>;
  }

  return (
    <ul className="category-list">
      {data?.map((category) => (
        <li key={category.id} className="category-item">
          <Link
            href={`/categories/${category.id}`}
            className="category-link"
          >
            <span className="category-name">{category.name}</span>
            <span className="category-description">{category.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}