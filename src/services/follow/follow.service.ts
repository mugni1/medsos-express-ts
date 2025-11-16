import prisma from "../../config/prisma";


export const followService = async ({ current_user_id, other_user_id }: { current_user_id: string, other_user_id: string }) => {
  return await prisma.follow.create({
    data: {
      followerId: current_user_id,
      followingId: other_user_id
    }
  });
};

export const updateFollowingCountService = async ({ user_id }: { user_id: string }) => {
  return await prisma.user.update({
    where: {
      id: user_id
    },
    data: {
      followingCount: { increment: 1 }
    }
  });
};

export const updateFollowerCountService = async ({ user_id }: { user_id: string }) => {
  return await prisma.user.update({
    where: {
      id: user_id
    },
    data: {
      followerCount: { increment: 1 }
    }
  });
};

export const checkFollowService = async ({ current_user_id, other_user_id }: { current_user_id: string, other_user_id: string }) => {
  return await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: current_user_id,
        followingId: other_user_id
      }
    }
  });
};
