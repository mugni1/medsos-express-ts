import prisma from "../../config/prisma";


export const followService = async ({ currentUserId, otherUserId }: { currentUserId: string, otherUserId: string }) => {
  return await prisma.follow.create({
    data: {
      followerId: otherUserId,
      followingId: currentUserId
    }
  });
};

export const unfollowService = async ({ currentUserId, otherUserId }: { currentUserId: string, otherUserId: string }) => {
  return await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: otherUserId,
        followingId: currentUserId
      }
    }
  })
}

export const updateFollowingCountService = async ({ userId, methode }: { userId: string; methode: 'increment' | 'decrement' }) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      followingCount: { [methode]: 1 }
    }
  });
};

export const updateFollowerCountService = async ({ userId, methode }: { userId: string; methode: 'increment' | 'decrement' }) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      followerCount: { [methode]: 1 }
    }
  });
};

export const checkFollowService = async ({ currentUserId, otherUserId }: { currentUserId: string, otherUserId: string }) => {
  return await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: otherUserId,
        followingId: currentUserId
      }
    }
  });
};
