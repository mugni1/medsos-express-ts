import prisma from "@/config/prisma";

export const postFeedService = async ({ content, imageUrl, userId }: { content: string, imageUrl?: string, userId: string }) => {
  return await prisma.post.create({
    data: {
      content,
      image: imageUrl,
      userId: userId
    }
  })
};

export const updatePostCountService = async ({ userId }: { userId: string }) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      postCount: {
        increment: 1
      }
    }
  })
};