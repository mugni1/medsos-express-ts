"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileByIdService = exports.getProfileDetailByIdService = exports.getProfileByIdService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getProfileByIdService = async ({ id }) => {
    return await prisma_1.default.user.findUnique({
        where: { id },
        include: {
            posts: true,
        },
        omit: {
            password: true
        }
    });
};
exports.getProfileByIdService = getProfileByIdService;
const getProfileDetailByIdService = async ({ id }) => {
    return await prisma_1.default.user.findUnique({
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
exports.getProfileDetailByIdService = getProfileDetailByIdService;
const updateProfileByIdService = async ({ id, name, username, avatar, bio }) => {
    return await prisma_1.default.user.update({
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
};
exports.updateProfileByIdService = updateProfileByIdService;
