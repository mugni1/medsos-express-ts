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

export const follow = async (req: Request, res: Response) => {
  const current_user_id = req.user_id as string;
  const other_user_id = req.params.other_user_id;

  if (current_user_id === other_user_id) {
    return response({ res, status: 400, message: "Cannot follow yourself" });
  }

  const existOtherUser = await getUserByIdService(other_user_id);
  if (!existOtherUser) {
    return response({ res, status: 404, message: "User not found" });
  }

  const isFollowing = await checkFollowService({ current_user_id, other_user_id });
  if (isFollowing) {
    return response({ res, status: 400, message: "Already following" });
  }

  try {
    const follow = await followService({ current_user_id, other_user_id });
    if (!follow) {
      return response({ res, status: 400, message: "Failed to follow" });
    }
    await updateFollowerCountService({ user_id: other_user_id, methode: 'increment' });
    const results = await updateFollowingCountService({ user_id: current_user_id, methode: 'increment' });
    return response({ res, status: 200, message: "Followed successfully", data: results });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to follow" });
  }
}

export const unfollow = async (req: Request, res: Response) => {
  const current_user_id = req.user_id as string;
  const other_user_id = req.params.other_user_id;

  if (current_user_id === other_user_id) {
    return response({ res, status: 400, message: "Cannot unfollow yourself" });
  }

  const existOtherUser = await getUserByIdService(other_user_id);
  if (!existOtherUser) {
    return response({ res, status: 404, message: "User not found" });
  }

  const isFollowing = await checkFollowService({ current_user_id, other_user_id });
  if (!isFollowing) {
    return response({ res, status: 400, message: "Already Unfollowed" });
  }

  try {
    const unfollow = await unfollowService({ current_user_id, other_user_id });
    if (!unfollow) {
      return response({ res, status: 400, message: "Failed to unfollow" });
    }
    await updateFollowerCountService({ user_id: other_user_id, methode: 'decrement' });
    const results = await updateFollowingCountService({ user_id: current_user_id, methode: 'decrement' });
    return response({ res, status: 200, message: "Unfollowed successfully", data: results });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to unfollow" });
  }
}