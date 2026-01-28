import { IProduct } from "./product";

export interface ICategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl?: string;

    products: IProduct[];
}