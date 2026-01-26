"use client"

import { useCategoryListQuery } from "../../categoryQueries";

export const useAdminCategoryListQuery = () => {
    return useCategoryListQuery();
};