"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegisterService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const postRegisterService = async (userData) => {
    return await prisma_1.default.user.create({
        data: {
            email: userData.email,
            username: userData.username,
            name: userData.name,
            password: userData.password,
        },
    });
};
exports.postRegisterService = postRegisterService;
