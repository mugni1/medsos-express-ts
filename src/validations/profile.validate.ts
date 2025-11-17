import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string("Name is required").min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
  username: z.string("Username is required").max(20, "Username must be at most 20 characters long").optional(),
  avatar: z.string("Avatar is required").optional(),
  bio: z.string("Bio is required").min(10, "Bio must be at least 10 characters long").max(500, "Bio must be at most 500 characters long"),
});
