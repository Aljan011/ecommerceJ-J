"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../axios-client";
import { IProduct } from "@/types";

export type AllProductsResponse = IProduct[];

export const useAllProductsQuery = (
  options?: Omit<
    UseQueryOptions<AllProductsResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<AllProductsResponse>({
    queryKey: ["products"],
    queryFn: () => apiClient.get("/products"),
    ...options,
  });
};
