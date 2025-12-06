"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFollowService = exports.updateFollowerCountService = exports.updateFollowingCountService = exports.unfollowService = exports.followService = exports.getFollowingsService = exports.getFollowersService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getFollowersService = async ({ userId }) => {
    return await prisma_1.default.follow.findMany({
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
exports.getFollowersService = getFollowersService;
const getFollowingsService = async ({ userId }) => {
    return await prisma_1.default.follow.findMany({
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
exports.getFollowingsService = getFollowingsService;
const followService = async ({ currentUserId, otherUserId }) => {
    return await prisma_1.default.follow.create({
        data: {
            followerId: currentUserId,
            followingId: otherUserId
        }
    });
};
exports.followService = followService;
const unfollowService = async ({ currentUserId, otherUserId }) => {
    return await prisma_1.default.follow.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: otherUserId
            }
        }
    });
};
exports.unfollowService = unfollowService;
const updateFollowingCountService = async ({ userId, methode }) => {
    return await prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            followingCount: { [methode]: 1 }
        }
    });
};
exports.updateFollowingCountService = updateFollowingCountService;
const updateFollowerCountService = async ({ userId, methode }) => {
    return await prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            followerCount: { [methode]: 1 }
        }
    });
};
exports.updateFollowerCountService = updateFollowerCountService;
const checkFollowService = async ({ currentUserId, otherUserId }) => {
    return await prisma_1.default.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: otherUserId
            }
        }
    });
};
exports.checkFollowService = checkFollowService;
