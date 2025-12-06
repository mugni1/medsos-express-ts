"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFeedSchema = void 0;
const zod_1 = require("zod");
exports.postFeedSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, { message: 'Content must be at least 1 character long' }).max(1000, { message: 'Content must be at most 1000 characters long' }),
    imageUrl: zod_1.z.string().optional(),
});
