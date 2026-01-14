import type { Request, Response } from "express";
import productService from "../services/product.service.ts";

//----Public Controllers----//
export const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id as string, 10);
  const product = await productService.getProductById(productId);

  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.categoryId as string, 10);
  const products = await productService.getProductsByCategory(categoryId);
  res.json(products);
};

//----Admin Controllers----//
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, categoryId, imageUrl, variants } = req.body;

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
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id as string, 10);
  const updatedProduct = await productService.updateProduct(
    productId,
    req.body
  );
  res.json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id as string, 10);
  await productService.deleteProduct(productId);
  res.status(204).send();
};
