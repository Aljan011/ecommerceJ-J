"use client"

import { useState } from "react";
import { useCreateCategoryMutation } from "@/lib/api/queries/admin/categoryQueries/category.mutations";

export default function CreateCategoryForm() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const { mutate, isPending } = useCreateCategoryMutation();

    const submit = () => {
        mutate({ name, slug, description, imageUrl});
    };

    return (
    <div className="space-y-3 border p-4 rounded">
      <h2 className="font-semibold">Create Category</h2>

      <input
        className="border p-2 w-full"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        disabled={isPending}
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {isPending ? "Creating..." : "Create"}
      </button>
    </div>
  );
}