import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.ts";
import userService from "./userService.ts";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Strict type for roles
export type Role = "ADMIN" | "USER";

interface AuthPayload {
  userId: string;
  role: Role;
}

const authService = {
  // ==========================
  // REGISTER USER
  // ==========================
  async registerUser(
    email: string,
    password: string,
    name?: string,
    guestId?: string,
  ) {
    // Check if user exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER",
        userType: "USER",
      },
    });

    // Merge guest cart & history into new user
    if (guestId) {
      await prisma.cartItem.updateMany({
        where: { guestId },
        data: {
          userId: user.id,
          guestId: null,
        },
      });

      await prisma.cartHistory.updateMany({
        where: { guestId },
        data: {
          userId: user.id,
          guestId: null,
        },
      });
    }

    // JWT payload
    const payload: AuthPayload = {
      userId: user.id,
      role: user.role as Role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  },

  // ==========================
  // LOGIN USER
  // ==========================
  async loginUser(email: string, password: string, guestId?: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Merge guest cart on login
    if (guestId) {
      await prisma.cartItem.updateMany({
        where: { guestId },
        data: {
          userId: user.id,
          guestId: null,
        },
      });

      await prisma.cartHistory.updateMany({
        where: { guestId },
        data: {
          userId: user.id,
          guestId: null,
        },
      });
    }

    // JWT payload
    const payload: AuthPayload = {
      userId: user.id, // ensure number
      role: user.role as Role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  },

  // ==========================
  // ADMIN LOGIN (optional separate method)
  // ==========================
  async loginAdmin(email: string, password: string) {
    const { user, token } = await this.loginUser(email, password);

    if (user.role !== "ADMIN") {
      throw new Error("Access denied: not an admin");
    }

    return { user, token };
  },
};

export default authService;
