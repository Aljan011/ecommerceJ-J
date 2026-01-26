"use client"

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../../axios-client";

import { IProduct, IVariant } from "@/types/index";

export type ProductByIdResponse = IProduct;

export const useProductByIdQuery = (
  productId: string,
  options?: Omit<
    UseQueryOptions<ProductByIdResponse>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<ProductByIdResponse>({
    queryKey: ["products", productId],
    queryFn: () => apiClient.get(`/products/${productId}`),
    enabled: !!productId,
    ...options,
  });
};