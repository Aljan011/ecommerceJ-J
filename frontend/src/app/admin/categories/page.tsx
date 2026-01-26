// app/admin/categories/page.tsx
"use client";

import Link from "next/link";
import { useAdminCategoryListQuery } from "@/lib/api/queries/admin/categoryQueries/category.queries";

export default function AdminCategoryPage() {
  const { data, isLoading, isError } = useAdminCategoryListQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Failed to load categories</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>

        <Link
          href="/admin/categories/new"
          className="rounded bg-black px-4 py-2 text-white text-sm"
        >
          Add Category
        </Link>
      </div>

      <div className="rounded border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2 text-gray-500">
                  {category.slug}
                </td>
                <td className="px-4 py-2 space-x-3">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
