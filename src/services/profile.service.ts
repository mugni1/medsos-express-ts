import prisma from "@/config/prisma";

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

export const getProfileDetailByIdService = async ({ id }: { id: string }) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      followers: {
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              avatar: true,
              username: true
            }
          }
        }
      },
      followings: {
        include: {
          following: {
            select: {
              id: true,
              name: true,
              avatar: true,
              username: true
            }
          }
        }
      },
      comments: true,
      likes: true
    },
    omit: {
      password: true
    }
  });
};

export const updateProfileByIdService = async ({ id, name, username, avatar, bio }: {
  id: string,
  name: string,
  username?: string,
  avatar?: string,
  bio: string
}) => {
  return await prisma.user.update({
    where: { id },
    omit: {
      password: true,
    },
    data: {
      name,
      bio,
      username,
      avatar
    },
  });
}