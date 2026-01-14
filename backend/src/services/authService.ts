import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.ts";
import userService from "./userService.ts";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

interface AuthPayload {
  userId: number;
  role: string;
}

const authService = {
  async registerUser(
    email: string,
    password: string,
    name?: string,
    guestId?: string
  ) {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "USER",
        userType: "USER",
      },
    });

    //  Merge guest cart & history into user
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

    const payload: AuthPayload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  },

  async loginUser(
    email: string,
    password: string,
    guestId?: string
  ) {
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

    //  Merge guest cart on login
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

    const payload: AuthPayload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...safeUser } = user;
    return { token, user: safeUser };
  },
};

export default authService;
