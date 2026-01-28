import { IVariant } from "./variant";

export interface IProduct {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;

    categoryId: string;

    variants: IVariant[];

}
