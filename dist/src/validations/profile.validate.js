"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string("Name is required").min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
    username: zod_1.z.string("Username is required").max(20, "Username must be at most 20 characters long").optional(),
    avatar: zod_1.z.string("Avatar is required").optional(),
    bio: zod_1.z.string("Bio is required").min(10, "Bio must be at least 10 characters long").max(500, "Bio must be at most 500 characters long"),
});
