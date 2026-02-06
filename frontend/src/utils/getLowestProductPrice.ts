import { IVariant } from "@/types";

export const getLowestProductPrice = (variants?: IVariant[]) : number | null => {
  if (!variants || variants.length === 0) {
    return null; // No variants available
  }

    let lowestPrice: number | null = null;

    for (const variant of variants) {
        for (const variantColor of variant.colors) {
            if (!variantColor.packPrices) continue; // Skip if no pack prices available

            for (const packPrice of variantColor.packPrices) {
                //optional
                if (packPrice.stock <= 0) continue; // Skip if out of stock

                if (lowestPrice === null || packPrice.price < lowestPrice) {
                    lowestPrice = packPrice.price;
                }
            }
        }
    }

    return lowestPrice;
};

