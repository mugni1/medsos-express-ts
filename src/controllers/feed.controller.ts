import { postFeedService, updatePostCountService } from "@/services";
import { postFeedSchema } from "@/validations";
import { Request, Response } from "express";
import { response } from "utils/response";

export const postFeed = async (req: Request, res: Response) => {
  const userId = req.user_id as string;
  const { error, success, data } = postFeedSchema.safeParse(req.body)
  if (!success) {
    const errors = error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message
    }));
    return response({ res, errors, status: 400, message: 'Invalid request' })
  }

  try {
    const results = await postFeedService({ content: data.content, imageUrl: data.imageUrl, userId });
    await updatePostCountService({ userId });
    return response({ res, data: results, status: 201, message: 'Feed posted successfully' });
  } catch (error) {
    return response({ res, status: 500, message: 'Internal server error' });
  }
};