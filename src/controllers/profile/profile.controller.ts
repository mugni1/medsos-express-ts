import { Request, Response } from "express";
import { response } from "../../../utils/response";
import { getProfileByIdService, getUserByUsernameService, updateProfileByIdService } from "../../services";
import { updateProfileSchema } from "../../validations";

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

export const updateProfile = async (req: Request, res: Response) => {
  const user_id = req.user_id as string;
  const reqBody = req.body;

  // validate
  const { success: successValidate, error: errorValidate, data: dataProfile } = updateProfileSchema.safeParse(reqBody);
  if (!successValidate) {
    const errors = errorValidate.issues.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    return response({ res, status: 400, message: "Invalid input", errors });
  }

  // check username exists
  const existUsername = await getUserByUsernameService(dataProfile.username);
  if (existUsername) {
    return response({ res, status: 409, message: "Username already exists" });
  }

  // update
  try {
    const users = await updateProfileByIdService({ id: user_id, name: dataProfile.name, username: dataProfile.username, bio: dataProfile.bio })
    response({ res, status: 200, message: "Profile updated successfully", data: users });
  } catch (error) {
    response({ res, status: 500, message: "Internal server error", errors: error });
  }
};
