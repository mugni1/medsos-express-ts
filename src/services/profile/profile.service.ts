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

export const updateProfileByIdService = async ({ id, name, username, bio }: {
  id: string,
  name: string,
  username: string,
  bio: string
}) => {
  return await prisma.user.update({
    where: { id },
    omit: {
      password: true,
    },
    data: {
      name,
      username,
      bio,
    },
  });
}