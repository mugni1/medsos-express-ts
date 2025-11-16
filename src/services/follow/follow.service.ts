import prisma from "../../config/prisma";


export const followService = async ({ current_user_id, other_user_id }: { current_user_id: string, other_user_id: string }) => {
  return await prisma.follow.create({
    data: {
      followerId: other_user_id,
      followingId: current_user_id
    }
  });
};

export const updateFollowingCountService = async ({ user_id, methode }: { user_id: string; methode: 'increment' | 'decrement' }) => {
  return await prisma.user.update({
    where: {
      id: user_id
    },
    data: {
      followingCount: { [methode]: 1 }
    }
  });
};

export const updateFollowerCountService = async ({ user_id, methode }: { user_id: string; methode: 'increment' | 'decrement' }) => {
  return await prisma.user.update({
    where: {
      id: user_id
    },
    data: {
      followerCount: { [methode]: 1 }
    }
  });
};

export const checkFollowService = async ({ current_user_id, other_user_id }: { current_user_id: string, other_user_id: string }) => {
  return await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: other_user_id,
        followingId: current_user_id
      }
    }
  });
};
