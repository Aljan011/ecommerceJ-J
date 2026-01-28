import type { Request, Response } from "express";
import variantColorService from "../services/variantColor.service.ts";

function getParamString(
  param: string | string[] | undefined,
  paramName: string
): string {
  if (!param) throw new Error(`${paramName} is required`);
  if (Array.isArray(param)) return param[0];
  return param;
}

// ---- Public Controllers ----
export const getVariantColors = async (req: Request, res: Response) => {
  try {
    const variantId = getParamString(req.params.variantId, "Variant ID");
    const colors = await variantColorService.getColorsByVariant(variantId);
    res.json(colors);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getVariantColor = async (req: Request, res: Response) => {
  try {
    const variantColorId = getParamString(req.params.id, "VariantColor ID");

    const variantColor =
      await variantColorService.getVariantColorById(variantColorId);

    if (!variantColor) {
      return res.status(404).json({ message: "Variant color not found" });
    }

    res.json(variantColor);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// ---- Admin Controllers ----
export const createVariantColor = async (req: Request, res: Response) => {
  try {
    const { variantId, colorId, price, stock } = req.body;

    if (!variantId || !colorId || price == null || stock == null) {
      return res.status(400).json({
        message: "variantId, colorId, price, and stock are required",
      });
    }

    const variantColor =
      await variantColorService.createVariantColor({
        variantId,
        colorId,
        price,
        stock,
      });

    res.status(201).json(variantColor);
  } catch (err: any) {
    // Prisma unique constraint (variantId + colorId)
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "This color already exists for the selected variant",
      });
    }

    res.status(400).json({ message: err.message });
  }
};

export const updateVariantColor = async (req: Request, res: Response) => {
  try {
    const variantColorId = getParamString(req.params.id, "VariantColor ID");

    const updatedVariantColor =
      await variantColorService.updateVariantColor(
        variantColorId,
        req.body
      );

    res.json(updatedVariantColor);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteVariantColor = async (req: Request, res: Response) => {
  try {
    const variantColorId = getParamString(req.params.id, "VariantColor ID");

    await variantColorService.deleteVariantColor(variantColorId);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
