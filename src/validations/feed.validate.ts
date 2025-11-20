import { z } from 'zod';

export const postFeedSchema = z.object({
  content: z.string().min(1, { message: 'Content must be at least 1 character long' }).max(1000, { message: 'Content must be at most 1000 characters long' }),
  imageUrl: z.string().optional(),
});