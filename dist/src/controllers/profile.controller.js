"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfileDetail = exports.getProfile = void 0;
const response_1 = require("../../utils/response");
const validations_1 = require("../validations");
const services_1 = require("../services");
const getProfile = async (req, res) => {
    const userId = req.user_id;
    if (!userId) {
        return (0, response_1.response)({ res, status: 401, message: "Unauthorized" });
    }
    try {
        const user = await (0, services_1.getProfileByIdService)({ id: userId });
        (0, response_1.response)({ res, status: 200, message: "Profile fetched successfully", data: user });
    }
    catch (error) {
        (0, response_1.response)({ res, status: 500, message: "Internal server error", errors: error });
    }
};
exports.getProfile = getProfile;
const getProfileDetail = async (req, res) => {
    const userId = req.user_id;
    if (!userId) {
        return (0, response_1.response)({ res, status: 401, message: "Unauthorized" });
    }
    try {
        const user = await (0, services_1.getProfileDetailByIdService)({ id: userId });
        (0, response_1.response)({ res, status: 200, message: "Profile detail fetched successfully", data: user });
    }
    catch (error) {
        (0, response_1.response)({ res, status: 500, message: "Internal server error", errors: error });
    }
};
exports.getProfileDetail = getProfileDetail;
const updateProfile = async (req, res) => {
    const userId = req.user_id;
    const reqBody = req.body;
    // validate
    const { success: successValidate, error: errorValidate, data: dataProfile } = validations_1.updateProfileSchema.safeParse(reqBody);
    if (!successValidate) {
        const errors = errorValidate.issues.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));
        return (0, response_1.response)({ res, status: 400, message: "Invalid input", errors });
    }
    // check username exists
    if (dataProfile.username) {
        const existUsername = await (0, services_1.getUserByUsernameService)(dataProfile.username);
        if (existUsername) {
            return (0, response_1.response)({ res, status: 409, message: "Username already exists" });
        }
    }
    // update
    try {
        const users = await (0, services_1.updateProfileByIdService)({
            id: userId,
            name: dataProfile.name,
            username: dataProfile.username,
            avatar: dataProfile.avatar,
            bio: dataProfile.bio
        });
        (0, response_1.response)({ res, status: 200, message: "Profile updated successfully", data: users });
    }
    catch (error) {
        (0, response_1.response)({ res, status: 500, message: "Internal server error", errors: error });
    }
};
exports.updateProfile = updateProfile;
