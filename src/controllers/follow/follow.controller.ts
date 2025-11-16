import { Request, Response } from "express";
import { checkFollowService, followService, getUserByIdService, updateFollowerCountService, updateFollowingCountService } from "../../services";
import { response } from "../../../utils/response";

export const follow = async (req: Request, res: Response) => {
  const current_user_id = req.user_id as string;
  const other_user_id = req.body.other_user_id;

  if (!other_user_id) {
    return response({ res, status: 400, message: "Please provide a valid other_user_id" });
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
    const updatedFollowerCount = await updateFollowerCountService({ user_id: other_user_id });
    const updatedFollowingCount = await updateFollowingCountService({ user_id: current_user_id });

    return response({ res, status: 200, message: "Followed successfully", data: { current_user: updatedFollowingCount, other_user: updatedFollowerCount, } });
  } catch (error) {
    return response({ res, status: 500, message: "Failed to follow" });
  }
}