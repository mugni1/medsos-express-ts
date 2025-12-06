import { response } from "utils/response";
import { updateProfileSchema } from "@/validations";
import { getProfileByIdService, getUserByUsernameService, updateProfileByIdService, getProfileDetailByIdService } from "@/services";
export const getProfile = async (req, res) => {
    const userId = req.user_id;
    if (!userId) {
        return response({ res, status: 401, message: "Unauthorized" });
    }
    try {
        const user = await getProfileByIdService({ id: userId });
        response({ res, status: 200, message: "Profile fetched successfully", data: user });
    }
    catch (error) {
        response({ res, status: 500, message: "Internal server error", errors: error });
    }
};
export const getProfileDetail = async (req, res) => {
    const userId = req.user_id;
    if (!userId) {
        return response({ res, status: 401, message: "Unauthorized" });
    }
    try {
        const user = await getProfileDetailByIdService({ id: userId });
        response({ res, status: 200, message: "Profile detail fetched successfully", data: user });
    }
    catch (error) {
        response({ res, status: 500, message: "Internal server error", errors: error });
    }
};
export const updateProfile = async (req, res) => {
    const userId = req.user_id;
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
    if (dataProfile.username) {
        const existUsername = await getUserByUsernameService(dataProfile.username);
        if (existUsername) {
            return response({ res, status: 409, message: "Username already exists" });
        }
    }
    // update
    try {
        const users = await updateProfileByIdService({
            id: userId,
            name: dataProfile.name,
            username: dataProfile.username,
            avatar: dataProfile.avatar,
            bio: dataProfile.bio
        });
        response({ res, status: 200, message: "Profile updated successfully", data: users });
    }
    catch (error) {
        response({ res, status: 500, message: "Internal server error", errors: error });
    }
};
