import type { Request, Response } from "express";
import variantService from "../services/variant.service.ts";

function getParamString(param: string | string[] | undefined, paramName: string): string {
  if (!param) throw new Error(`${paramName} is required`);
  if (Array.isArray(param)) return param[0];
  return param;
}

//----Public Controllers----//
export const getVariants = async (req: Request, res: Response) => {
  try {
    const productId = getParamString(req.params.productId, "Product ID");

    const variants = await variantService.getVariantByProduct(productId);
    res.json(variants);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getVariant = async (req: Request, res: Response) => {
  try {
    const variantId = getParamString(req.params.id, "Variant ID");

    const variant = await variantService.getVariantById(variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });
    res.json(variant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//----Admin Controllers----//
export const createVariant = async (req: Request, res: Response) => {
  try {
    const { productId, name, price, stock } = req.body;

    if (!productId || !name || price == null || stock == null) {
      return res
        .status(400)
        .json({ message: "Product ID, name, price, and stock are required" });
    }

    const variant = await variantService.createVariant({
      productId,
      name,
      price,
      stock,
    });
    res.status(201).json(variant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateVariant = async (req: Request, res: Response) => {
  try {
    const variantId = getParamString(req.params.id, "Variant ID");

    const updatedVariant = await variantService.updateVariant(variantId, req.body);
    res.json(updatedVariant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteVariant = async (req: Request, res: Response) => {
  try {
    const variantId = getParamString(req.params.id, "Variant ID");

    await variantService.deleteVariant(variantId);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
