import prisma from "../../config/prisma"
import { z } from "zod";
import { registerSchema } from "../../validations";

export const postRegisterService = async (userData: z.infer<typeof registerSchema>) => {
  return await prisma.user.create({
    data: {
      email: userData.email,
      username: userData.username,
      name: userData.name,
      password: userData.password,
    },
  });
}