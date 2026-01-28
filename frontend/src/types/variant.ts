import { IColor } from "./color";

export interface IVariantColor {
  id: string;
  price: number;
  stock: number;

  color: IColor;

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
