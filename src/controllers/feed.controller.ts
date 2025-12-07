import {
  getFeedByUserIdService,
  postFeedService,
  updatePostCountService,
  getAllFeedService,
  getDetailFeedByIdService,
  getFeedCountByIdService,
  deleteFeedByIdService
} from "../services";
import { postFeedSchema } from "../validations";
import { Request, Response } from "express";
import { response } from "../../utils/response";
import { del } from "@vercel/blob"

export const postFeed = async (req: Request, res: Response) => {
  const userId = req.user_id as string;
  const { error, success, data } = postFeedSchema.safeParse(req.body)
  if (!success) {
    const errors = error.issues.map((err: any) => ({
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

export const deleteFeedById = async (req: Request, res: Response) => {
  const userId = req.user_id as string
  const { id } = req.params

  const feed = await getDetailFeedByIdService({ id })
  if (!feed) {
    return response({ res, status: 404, message: "Feed not found" })
  }
  if (feed.userId != userId) {
    return response({ res, status: 403, message: "Cannot delete this feed" })
  }

  if (feed.image) {
    await del(feed.image)
  }

  const deleted = await deleteFeedByIdService({ id })
  if (!deleted) {
    return response({ res, status: 500, message: "Internal server error" })
  }

  return response({ res, data: deleted, status: 200, message: 'Deleted successfully' });
}