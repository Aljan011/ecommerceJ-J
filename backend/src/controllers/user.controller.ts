import type { Request, Response } from "express";
import userService from "../services/userService.ts";

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.userId; // from auth middleware
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.userId; // from auth middleware
    const { email, name, password } = req.body;
    const updatedUser = await userService.updateUser(userId, {
      email,
      name,
      password,
    });
    const { password: _, ...safeUser } = updatedUser;
    res.json(safeUser);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.userId;
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
