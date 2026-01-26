"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/axios-client"
import { ICategory } from "@/types"

export interface CreateCategoryPayload {
    name: string;
    slug: string;
    description?: string;
    imageUrl? : string;
}

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<ICategory, Error, CreateCategoryPayload>({
        mutationFn: (payload) =>
            apiClient.post("/categories", payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};