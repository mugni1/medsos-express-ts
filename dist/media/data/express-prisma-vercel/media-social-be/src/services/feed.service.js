"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailFeedByIdService = exports.getAllFeedService = exports.getFeedByUserIdService = exports.updatePostCountService = exports.postFeedService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const postFeedService = async ({ content, imageUrl, userId }) => {
    return await prisma_1.default.post.create({
        data: {
            content,
            image: imageUrl,
            userId: userId
        }
    });
};
exports.postFeedService = postFeedService;
const updatePostCountService = async ({ userId }) => {
    return await prisma_1.default.user.update({
        where: {
            id: userId
        },
        data: {
            postCount: {
                increment: 1
            }
        }
    });
};
exports.updatePostCountService = updatePostCountService;
const getFeedByUserIdService = async ({ userId }) => {
    return await prisma_1.default.post.findMany({
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
    });
};
exports.getFeedByUserIdService = getFeedByUserIdService;
const getAllFeedService = async () => {
    return await prisma_1.default.post.findMany({
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
    });
};
exports.getAllFeedService = getAllFeedService;
const getDetailFeedByIdService = async ({ id }) => {
    return await prisma_1.default.post.findUnique({
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
    });
};
exports.getDetailFeedByIdService = getDetailFeedByIdService;
