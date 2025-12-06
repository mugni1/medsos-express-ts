"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const jwt_1 = require("../../utils/jwt");
const response_1 = require("../../utils/response");
const services_1 = require("../services");
const authorizationMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!token) {
        return (0, response_1.response)({ res, status: 401, message: "Missing token" });
    }
    const decoded = (0, jwt_1.decodeToken)(token);
    if (!decoded) {
        return (0, response_1.response)({ res, status: 401, message: "Unauthorized" });
    }
    try {
        const user = await (0, services_1.getUserByIdService)(decoded.id);
        if (!user) {
            return (0, response_1.response)({ res, status: 401, message: "Unauthorized" });
        }
        req.user_id = user.id;
        return next();
    }
    catch {
        return (0, response_1.response)({ res, status: 500, message: "Internal Server Error" });
    }
};
exports.authorizationMiddleware = authorizationMiddleware;
