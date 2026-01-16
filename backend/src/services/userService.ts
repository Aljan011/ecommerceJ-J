import prisma from "../config/prisma.ts";
import bcrypt from "bcryptjs";

const userService = {
  async createUser(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "normal",
      },
    });
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  async deleteUser(userId: string) {
    return prisma.user.delete({
      where: { id: userId },
    });
  },

  async updateUser(
    userId: string,
    data: {
      email?: string;
      name?: string;
      password?: string;
    }
  ) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },
};

export default userService;
