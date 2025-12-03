import { getFeedByUserIdService, postFeedService, updatePostCountService, getAllFeedService, getDetailFeedByIdService } from "@/services";
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

export const getFeedByUserId = async (req: Request, res: Response) => {
  const userId = req.user_id as string;
  try {
    const results = await getFeedByUserIdService({ userId });
    return response({ res, data: results, status: 200, message: 'Feed retrieved successfully' });
  } catch (error) {
    return response({ res, status: 500, message: 'Internal server error' });
  }
}

export const getAllFeeds = async (req: Request, res: Response) => {
  try {
    const results = await getAllFeedService()
    return response({ res, data: results, status: 200, message: 'Get feeds successfully' });
  } catch {
    return response({ res, status: 500, message: 'Internal server error' });
  }
}

export const getDetailFeedById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const results = await getDetailFeedByIdService({ id: id })
    if (!results) {
      return response({ res, data: null, status: 404, message: 'Feed not found' });
    }
    return response({ res, data: results, status: 200, message: 'Get feed successfully' });
  } catch {
    return response({ res, status: 500, message: 'Internal server error' });
  }
}