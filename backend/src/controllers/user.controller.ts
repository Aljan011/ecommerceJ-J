import type { Request, Response } from "express";
import userService from "../services/userService.ts";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const updateMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId; // string
    const { email, name, password } = req.body;

    const updatedUser = await userService.updateUser(userId, {
      email,
      name,
      password,
    });

    const { password: _, ...safeUser } = updatedUser;
    res.json(safeUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.userId; // string
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
