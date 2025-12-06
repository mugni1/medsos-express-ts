import prisma from "@/config/prisma";
export const postRegisterService = async (userData) => {
    return await prisma.user.create({
        data: {
            email: userData.email,
            username: userData.username,
            name: userData.name,
            password: userData.password,
        },
    });
};
