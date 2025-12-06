"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulterErrorMiddleware = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const response_1 = require("../../utils/response");
const storage = multer_1.default.memoryStorage();
exports.uploadMiddleware = (0, multer_1.default)({ storage, limits: { fileSize: 1024 * 1024 * 5 } });
const handleMulterErrorMiddleware = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        return (0, response_1.response)({ message: err.message, res, status: 400 });
    }
    next();
};
exports.handleMulterErrorMiddleware = handleMulterErrorMiddleware;
