import { GetUsersParams } from "../../../types/user.type";
import prisma from "../../config/prisma";

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

export const getUserService = async ({ sortBy, orderBy, search, offset, limit }: GetUsersParams) => {
  return await prisma.user.findMany({
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

export const getUserByEmailService = async (email: string) => {
  return await prisma.user.findUnique({
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

export const getUserByIdService = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    omit: {
      password: true
    }
  });
};

export const getUserByUsernameService = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      posts: true,
    },
    omit: {
      password: true
    }
  });
};

export const getUserDetailByUsernameService = async ({ username }: { username: string }) => {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      posts: true,
      comments: true,
      followers: true,
      following: true,
      likes: true,
    },
    omit: {
      password: true,
    }
  });
};