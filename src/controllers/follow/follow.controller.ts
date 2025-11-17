import { Request, Response } from "express";
import {
  checkFollowService,
  followService,
  getUserByIdService,
  unfollowService,
  updateFollowerCountService,
  updateFollowingCountService
} from "../../services";
import { response } from "../../../utils/response";
import { getFollowersService, getFollowingsService } from "../../services/follow/follow.service";
import { id } from "zod/v4/locales";

export const getFollowers = async (req: Request, res: Response) => {
  const userId = req.user_id as string;

  try {
    const followers = await getFollowersService({ userId });
    return response({
      res, status: 200, message: "Followers fetched successfully", data: {
        id: userId,
        followers: followers
      }
    });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to fetch followers" });
  }
}

export const getFollowings = async (req: Request, res: Response) => {
  const userId = req.user_id as string;

  try {
    const followings = await getFollowingsService({ userId });
    return response({
      res, status: 200, message: "Followings fetched successfully", data: {
        id: userId,
        followings: followings
      }
    });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to fetch followers" });
  }
}

export const follow = async (req: Request, res: Response) => {
  const currentUserId = req.user_id as string;
  const otherUserId = req.params.otherUserId;

  if (currentUserId === otherUserId) {
    return response({ res, status: 400, message: "Cannot follow yourself" });
  }

  try {
    const existOtherUser = await getUserByIdService(otherUserId);
    if (!existOtherUser) {
      return response({ res, status: 404, message: "User not found" });
    }

    const isFollowing = await checkFollowService({ currentUserId, otherUserId });
    if (isFollowing) {
      return response({ res, status: 400, message: "Already following" });
    }

    const follow = await followService({ currentUserId, otherUserId });
    if (!follow) {
      return response({ res, status: 400, message: "Failed to follow" });
    }

    await updateFollowerCountService({ userId: otherUserId, methode: 'increment' });
    const results = await updateFollowingCountService({ userId: currentUserId, methode: 'increment' });
    return response({ res, status: 200, message: "Followed successfully", data: results });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to follow" });
  }
}

export const unfollow = async (req: Request, res: Response) => {
  const currentUserId = req.user_id as string;
  const otherUserId = req.params.otherUserId;

  if (currentUserId === otherUserId) {
    return response({ res, status: 400, message: "Cannot unfollow yourself" });
  }

  try {
    const existOtherUser = await getUserByIdService(otherUserId);
    if (!existOtherUser) {
      return response({ res, status: 404, message: "User not found" });
    }

    const isFollowing = await checkFollowService({ currentUserId, otherUserId });
    if (!isFollowing) {
      return response({ res, status: 400, message: "Already Unfollowed" });
    }

    const unfollow = await unfollowService({ currentUserId, otherUserId });
    if (!unfollow) {
      return response({ res, status: 400, message: "Failed to unfollow" });
    }

    await updateFollowerCountService({ userId: otherUserId, methode: 'decrement' });
    const results = await updateFollowingCountService({ userId: currentUserId, methode: 'decrement' });
    return response({ res, status: 200, message: "Unfollowed successfully", data: results });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to unfollow" });
  }
}