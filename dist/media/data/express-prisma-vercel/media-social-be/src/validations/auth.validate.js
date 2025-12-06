"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string("name is required").min(2, "name must be at least 2 characters").max(50, "name must be at most 50 characters"),
    username: zod_1.z.string("username is required").min(5, "username must be at least 5 characters").max(20, "username must be at most 20 characters"),
    email: zod_1.z.email("email is required and please enter a valid email"),
    password: zod_1.z.string("password is required").min(8, "password must be at least 8 characters").max(12, "password must be at most 12 characters")
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("email is required and please enter a valid email"),
    password: zod_1.z.string("password is required").min(8, "password must be at least 8 characters").max(12, "password must be at most 12 characters")
});
