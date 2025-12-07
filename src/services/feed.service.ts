import prisma from "../config/prisma";

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

export const getFeedByUserIdService = async ({ userId }: { userId: string }) => {
  return await prisma.post.findMany({
    where: {
      userId: userId
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          avatar: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
};

export const getAllFeedService = async () => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
          username: true
        },
      }
    }
  })
}

export const getDetailFeedByIdService = async ({ id }: { id: string }) => {
  return await prisma.post.findUnique({
    where: {
      id: id
    },
    include: {
      comments: true,
      likes: true,
      user: {
        select: {
          username: true,
          name: true,
          avatar: true,
        }
      }
    }
  })
}

export const getFeedCountByIdService = async ({ id }: { id: string }) => {
  return await prisma.post.count({
    where: {
      id: id
    }
  })
}

export const deleteFeedByIdService = async ({ id }: { id: string }) => {
  return await prisma.post.delete({
    where: {
      id: id
    }
  })
}