import { IColor } from "./color";

export interface IVariantColor {
  id: string;

  color: IColor;

  packPrices?: IVariantColorPackPrice[];

  createdAt?: string;
  updatedAt?: string;
}

export interface IVariant {
  id: string;
  name: string;

  colors: IVariantColor[];

  createdAt?: string;
  updatedAt?: string;
}

export interface IVariantColorPackPrice {
  id: string;
  packSize: number;
  price: number;
  stock: number;
  variantColorId: string;

  createdAt?: string;
  updatedAt?: string;
}
