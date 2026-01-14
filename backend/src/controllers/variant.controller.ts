import type { Request, Response } from "express";
import variantService from "../services/variant.service.ts";

//----Public Controllers----//
export const getVariants = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.productId as string, 10);
    const variants = await variantService.getVariantByProduct(productId);
    res.json(variants);
};

export const getVariant = async (req: Request, res: Response) => {
    const variantId = parseInt(req.params.id as string, 10);
    const variant = await variantService.getVariantById(variantId);

    if (!variant) 
        return res.status(404).json({ message: "Variant not found" });
        res.json(variant);
};

//----Admin Controllers----//
export const createVariant = async (req: Request, res: Response) => {
    const { productId, name, price, stock } = req.body;
    if (!name || price == null || stock == null || !productId) {
        return res.status(400).json({ message: "Name, price, stock, and productId are required" });
    }

    const variant = await variantService.createVariant({ productId, name, price, stock });
    res.status(201).json(variant);
};

export const updateVariant = async (req: Request, res: Response) => {
    const variantId = parseInt(req.params.id as string, 10);
    const updatedVariant = await variantService.updateVariant(variantId, req.body);
    res.json(updatedVariant);
};

export const deleteVariant = async (req: Request, res: Response) => {
    const variantId = parseInt(req.params.id as string, 10);
    await variantService.deleteVariant(variantId);
    res.status(204).send();
};
