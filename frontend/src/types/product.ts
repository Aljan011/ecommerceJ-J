import { IVariant } from "./index";

export interface IProduct {
    id: string;
    name: string;
    description: string;
    variants: IVariant[];
}