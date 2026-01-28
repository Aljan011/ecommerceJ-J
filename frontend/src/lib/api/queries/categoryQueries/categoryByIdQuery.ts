"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../axios-client";
import type { ICategory } from "@/types";

export type CategoryByIdResponse = ICategory;

export const useCategoryByIdQuery = (
  categoryId: string,
  options?: Omit<
    UseQueryOptions<CategoryByIdResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<CategoryByIdResponse>({
    queryKey: ["categories", categoryId],
    queryFn: () => apiClient.get(`/categories/${categoryId}`),
    enabled: !!categoryId,
    ...options,
  });
};