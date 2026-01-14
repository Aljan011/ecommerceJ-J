import type { Request, Response } from "express";
import categoryService from "../services/category.service.ts";

//-------------------------------
//PUBLIC
//-------------------------------

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  // const categoryId = parseInt(req.params.id as string, 10);
  const categoryId = req.params.id as string; // changed to normal (because we dont need to change the param id into number)

  const category = await categoryService.getCategoryById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id as string, 10);

  const products = await categoryService.getProductsByCategory(categoryId);
  res.json(products);
};

//-------------------------------
//ADMIN
//-------------------------------

export const createCategory = async (req: Request, res: Response) => {
  const { name, description, imageUrl } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }

  const category = await categoryService.createCategory({
    name,
    description,
    imageUrl,
  });
  res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id as string, 10);

  const category = await categoryService.updateCategory(categoryId, req.body);
  res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = parseInt(req.params.id as string, 10);

  await categoryService.deleteCategory(categoryId);
  res.status(204).send();
};
