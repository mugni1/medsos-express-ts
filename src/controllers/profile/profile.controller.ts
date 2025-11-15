import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { getProfileByIdService } from "../../services";

export const getProfile = async (req: Request, res: Response) => {
  const user_id = req.user_id;
  if (!user_id) {
    return response({ res, status: 401, message: "Unauthorized" });
  }
  try {
    const user = await getProfileByIdService({ id: user_id });
    response({ res, status: 200, message: "Profile fetched successfully", data: user, errors: null });
  } catch (error) {
    response({ res, status: 500, message: "Internal server error", data: null, errors: error });
  }
};
