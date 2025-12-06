"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollow = exports.follow = exports.getFollowings = exports.getFollowers = void 0;
const services_1 = require("../services");
const response_1 = require("../../utils/response");
const getFollowers = async (req, res) => {
    const userId = req.user_id;
    try {
        const followers = await (0, services_1.getFollowersService)({ userId });
        return (0, response_1.response)({ res, status: 200, message: "Followers fetched successfully", data: followers });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: "Failed to fetch followers" });
    }
};
exports.getFollowers = getFollowers;
const getFollowings = async (req, res) => {
    const userId = req.user_id;
    try {
        const followings = await (0, services_1.getFollowingsService)({ userId });
        return (0, response_1.response)({ res, status: 200, message: "Followings fetched successfully", data: followings });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: "Failed to fetch followers" });
    }
};
exports.getFollowings = getFollowings;
const follow = async (req, res) => {
    const currentUserId = req.user_id;
    const otherUserId = req.params.otherUserId;
    if (currentUserId === otherUserId) {
        return (0, response_1.response)({ res, status: 400, message: "Cannot follow yourself" });
    }
    try {
        const existOtherUser = await (0, services_1.getUserByIdService)(otherUserId);
        if (!existOtherUser) {
            return (0, response_1.response)({ res, status: 404, message: "User not found" });
        }
        const isFollowing = await (0, services_1.checkFollowService)({ currentUserId, otherUserId });
        if (isFollowing) {
            return (0, response_1.response)({ res, status: 400, message: "Already following" });
        }
        const follow = await (0, services_1.followService)({ currentUserId, otherUserId });
        if (!follow) {
            return (0, response_1.response)({ res, status: 400, message: "Failed to follow" });
        }
        await (0, services_1.updateFollowerCountService)({ userId: otherUserId, methode: 'increment' });
        const results = await (0, services_1.updateFollowingCountService)({ userId: currentUserId, methode: 'increment' });
        return (0, response_1.response)({ res, status: 200, message: "Followed successfully", data: results });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: "Failed to follow" });
    }
};
exports.follow = follow;
const unfollow = async (req, res) => {
    const currentUserId = req.user_id;
    const otherUserId = req.params.otherUserId;
    if (currentUserId === otherUserId) {
        return (0, response_1.response)({ res, status: 400, message: "Cannot unfollow yourself" });
    }
    try {
        const existOtherUser = await (0, services_1.getUserByIdService)(otherUserId);
        if (!existOtherUser) {
            return (0, response_1.response)({ res, status: 404, message: "User not found" });
        }
        const isFollowing = await (0, services_1.checkFollowService)({ currentUserId, otherUserId });
        if (!isFollowing) {
            return (0, response_1.response)({ res, status: 400, message: "Already Unfollowed" });
        }
        const unfollow = await (0, services_1.unfollowService)({ currentUserId, otherUserId });
        if (!unfollow) {
            return (0, response_1.response)({ res, status: 400, message: "Failed to unfollow" });
        }
        await (0, services_1.updateFollowerCountService)({ userId: otherUserId, methode: 'decrement' });
        const results = await (0, services_1.updateFollowingCountService)({ userId: currentUserId, methode: 'decrement' });
        return (0, response_1.response)({ res, status: 200, message: "Unfollowed successfully", data: results });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: "Failed to unfollow" });
    }
};
exports.unfollow = unfollow;
