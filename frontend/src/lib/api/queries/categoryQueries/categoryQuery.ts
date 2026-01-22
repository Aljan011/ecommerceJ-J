"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/axios-client";

export interface ICategory {
    id: string;
    name: string;
    slug: string;
    description: string;
}

export type CategoryListResponse = ICategory[];

export const useCategoryListQuery = (
    options?: Omit<
    UseQueryOptions<CategoryListResponse>,
    "queryKey" | "queryFn"
    >,
) => {
    return useQuery<CategoryListResponse>({
        queryKey: ["categories"],
        queryFn: () => apiClient.get("/categories"),
        ...options,
    });
};
