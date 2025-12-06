import { z } from 'zod';
export const registerSchema = z.object({
    name: z.string("name is required").min(2, "name must be at least 2 characters").max(50, "name must be at most 50 characters"),
    username: z.string("username is required").min(5, "username must be at least 5 characters").max(20, "username must be at most 20 characters"),
    email: z.email("email is required and please enter a valid email"),
    password: z.string("password is required").min(8, "password must be at least 8 characters").max(12, "password must be at most 12 characters")
});
export const loginSchema = z.object({
    email: z.email("email is required and please enter a valid email"),
    password: z.string("password is required").min(8, "password must be at least 8 characters").max(12, "password must be at most 12 characters")
});
