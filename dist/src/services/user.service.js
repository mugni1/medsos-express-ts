"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetailByUsernameService = exports.getUserByUsernameService = exports.getUserByIdService = exports.getUserByEmailService = exports.getUserService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// export const getUserService = async ({ sortBy, orderBy, search, offset, limit }: GetUsersParams) => {
//   const cached = await redis.get("GET_USERS_SERVICE")
//   if (cached) {
//     console.log("📦 Cache HIT");
//     return JSON.parse(cached);
//   }
//   console.log("💾 Cache MISS — Query DB");
//   const users = await prisma.user.findMany({
//     orderBy: {
//       [sortBy]: orderBy
//     },
//     skip: offset,
//     take: limit,
//     where: {
//       OR: [
//         { name: { contains: search, mode: 'insensitive' } },
//         { email: { contains: search, mode: 'insensitive' } },
//         { username: { contains: search, mode: 'insensitive' } }
//       ]
//     },
//     omit: {
//       password: true
//     }
//   });
//   redis.set("GET_USERS_SERVICE", JSON.stringify(users), "EX", 60 * 60 * 24);
//   return users;
// };
const getUserService = async ({ sortBy, orderBy, search, offset, limit }) => {
    return await prisma_1.default.user.findMany({
        orderBy: {
            [sortBy]: orderBy
        },
        skip: offset,
        take: limit,
        where: {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } }
            ]
        },
        omit: {
            password: true
        }
    });
};
exports.getUserService = getUserService;
const getUserByEmailService = async (email) => {
    return await prisma_1.default.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            password: true,
            username: true,
            email: true,
            createdAt: true,
        }
    });
};
exports.getUserByEmailService = getUserByEmailService;
const getUserByIdService = async (id) => {
    return await prisma_1.default.user.findUnique({
        where: { id },
        omit: {
            password: true
        }
    });
};
exports.getUserByIdService = getUserByIdService;
const getUserByUsernameService = async (username) => {
    return await prisma_1.default.user.findUnique({
        where: { username },
        include: {
            posts: true,
        },
        omit: {
            password: true
        }
    });
};
exports.getUserByUsernameService = getUserByUsernameService;
const getUserDetailByUsernameService = async ({ username }) => {
    return await prisma_1.default.user.findUnique({
        where: { username },
        include: {
            posts: true,
            comments: true,
            followers: true,
            followings: true,
            likes: true,
        },
        omit: {
            password: true,
        }
    });
};
exports.getUserDetailByUsernameService = getUserDetailByUsernameService;
