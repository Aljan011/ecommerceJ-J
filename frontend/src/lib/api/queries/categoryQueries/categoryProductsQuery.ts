"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../axios-client";

import { IVariant, IProduct } from "@/types/index";

export type CategoryProductsResponse = IProduct[];

export const useCategoryProductsQuery = (
    categoryId: string,
    options?: Omit<
    UseQueryOptions<CategoryProductsResponse>,
    "queryKey" | "queryFn"
    >,
) => {
    return useQuery<CategoryProductsResponse>({
        queryKey: ["categories", categoryId, "products"],
        queryFn: () => 
            apiClient.get(`/categories/${categoryId}/products`),
        enabled: !!categoryId,
        ...options,
    })
}