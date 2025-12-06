"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getUsersRandom = exports.getUsers = void 0;
const response_1 = require("../../utils/response");
const services_1 = require("../services/");
const random_1 = require("../../utils/random");
const getUsers = async (req, res) => {
    const page = req.query.page || "1";
    const limit = req.query.limit || "10";
    const search = req.query.search || "";
    const orderBy = req.query.orderBy || "asc";
    const sortBy = req.query.sortBy || "id";
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
        const users = await (0, services_1.getUserService)({ orderBy, sortBy, search, offset, limit: parseInt(limit) });
        const meta = { total: users.length, page: parseInt(page), limit: parseInt(limit), offset, orderBy, sortBy, search };
        (0, response_1.response)({ res, status: 200, message: "Users fetched successfully", data: users, meta });
    }
    catch (error) {
        (0, response_1.response)({ res, status: 500, message: "Internal Server Error" });
    }
};
exports.getUsers = getUsers;
const getUsersRandom = async (req, res) => {
    const randomNumber = (0, random_1.getRandomNumber)(5);
    let orderBy = "asc";
    let sortBy = "id";
    if (randomNumber == 0) {
        orderBy = "desc";
        sortBy = "email";
    }
    else if (randomNumber == 1) {
        orderBy = "asc";
        sortBy = "name";
    }
    else if (randomNumber == 2) {
        orderBy = "desc";
        sortBy = "name";
    }
    else if (randomNumber == 3) {
        orderBy = "asc";
        sortBy = "email";
    }
    else if (randomNumber == 4) {
        orderBy = "desc";
        sortBy = "createdAt";
    }
    else if (randomNumber == 5) {
        orderBy = "asc";
        sortBy = "createdAt";
    }
    else {
        orderBy = "asc";
        sortBy = "id";
    }
    try {
        const users = await (0, services_1.getUserService)({ orderBy, sortBy, search: "", offset: 0, limit: 5 });
        (0, response_1.response)({ res, status: 200, message: "Users fetched successfully", data: users });
    }
    catch (error) {
        (0, response_1.response)({ res, status: 500, message: "Internal Server Error" });
    }
};
exports.getUsersRandom = getUsersRandom;
const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await (0, services_1.getUserByUsernameService)(username);
        if (!user) {
            return (0, response_1.response)({ res, status: 404, message: "User not found" });
        }
        (0, response_1.response)({ res, status: 200, message: "User fetched successfully", data: user });
    }
    catch (error) {
        (0, response_1.response)({ res, status: 500, message: "Internal Server Error" });
    }
};
exports.getUserByUsername = getUserByUsername;
