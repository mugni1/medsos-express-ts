import prisma from "../../config/prisma";

export const getProfileByIdService = async ({ id }: { id: string }) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
    },
    omit: {
      password: true
    }
  });
};