"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedById = exports.getDetailFeedById = exports.getAllFeeds = exports.getFeedByUserId = exports.postFeed = void 0;
const services_1 = require("../services");
const validations_1 = require("../validations");
const response_1 = require("../../utils/response");
const postFeed = async (req, res) => {
    const userId = req.user_id;
    const { error, success, data } = validations_1.postFeedSchema.safeParse(req.body);
    if (!success) {
        const errors = error.issues.map((err) => ({
            path: err.path.join('.'),
            message: err.message
        }));
        return (0, response_1.response)({ res, errors, status: 400, message: 'Invalid request' });
    }
    try {
        const results = await (0, services_1.postFeedService)({ content: data.content, imageUrl: data.imageUrl, userId });
        await (0, services_1.updatePostCountService)({ userId });
        return (0, response_1.response)({ res, data: results, status: 201, message: 'Feed posted successfully' });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: 'Internal server error' });
    }
};
exports.postFeed = postFeed;
const getFeedByUserId = async (req, res) => {
    const userId = req.user_id;
    try {
        const results = await (0, services_1.getFeedByUserIdService)({ userId });
        return (0, response_1.response)({ res, data: results, status: 200, message: 'Feed retrieved successfully' });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: 'Internal server error' });
    }
};
exports.getFeedByUserId = getFeedByUserId;
const getAllFeeds = async (req, res) => {
    try {
        const results = await (0, services_1.getAllFeedService)();
        return (0, response_1.response)({ res, data: results, status: 200, message: 'Get feeds successfully' });
    }
    catch {
        return (0, response_1.response)({ res, status: 500, message: 'Internal server error' });
    }
};
exports.getAllFeeds = getAllFeeds;
const getDetailFeedById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await (0, services_1.getDetailFeedByIdService)({ id: id });
        if (!results) {
            return (0, response_1.response)({ res, data: null, status: 404, message: 'Feed not found' });
        }
        return (0, response_1.response)({ res, data: results, status: 200, message: 'Get feed successfully' });
    }
    catch {
        return (0, response_1.response)({ res, status: 500, message: 'Internal server error' });
    }
};
exports.getDetailFeedById = getDetailFeedById;
const deleteFeedById = async (req, res) => {
    const { id } = req.params;
    return (0, response_1.response)({ res, data: { id }, status: 200, message: 'Deleted successfully' });
};
exports.deleteFeedById = deleteFeedById;
