import prisma from "@/config/prisma";
export const getFollowersService = async ({ userId }) => {
    return await prisma.follow.findMany({
        where: {
            followingId: userId
        },
        omit: {
            followingId: true,
        },
        include: {
            follower: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true
                }
            }
        }
    });
};
export const getFollowingsService = async ({ userId }) => {
    return await prisma.follow.findMany({
        where: {
            followerId: userId
        },
        omit: {
            followerId: true
        },
        include: {
            following: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true
                }
            }
        }
    });
};
export const followService = async ({ currentUserId, otherUserId }) => {
    return await prisma.follow.create({
        data: {
            followerId: currentUserId,
            followingId: otherUserId
        }
    });
};
export const unfollowService = async ({ currentUserId, otherUserId }) => {
    return await prisma.follow.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: otherUserId
            }
        }
    });
};
export const updateFollowingCountService = async ({ userId, methode }) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            followingCount: { [methode]: 1 }
        }
    });
};
export const updateFollowerCountService = async ({ userId, methode }) => {
    return await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            followerCount: { [methode]: 1 }
        }
    });
};
export const checkFollowService = async ({ currentUserId, otherUserId }) => {
    return await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: otherUserId
            }
        }
    });
};
