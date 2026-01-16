import type { Request, Response } from "express";
import productService from "../services/product.service.ts";

//----Public Controllers----//
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    if (Array.isArray(productId)) productId = productId[0]; // handle string[]

    const product = await productService.getProductById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    let categoryId = req.params.categoryId;
    if (!categoryId) return res.status(400).json({ message: "Category ID required" });

    if (Array.isArray(categoryId)) categoryId = categoryId[0]; // handle string[]

    const products = await productService.getProductsByCategory(categoryId);
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

//----Admin Controllers----//
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, categoryId, imageUrl } = req.body;

    if (!name || !description || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, description, and categoryId are required" });
    }

    const product = await productService.createProduct({
      name,
      description,
      categoryId,
      imageUrl,
    });

    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    if (Array.isArray(productId)) productId = productId[0];

    const updatedProduct = await productService.updateProduct(productId, req.body);
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    if (Array.isArray(productId)) productId = productId[0];

    await productService.deleteProduct(productId);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
