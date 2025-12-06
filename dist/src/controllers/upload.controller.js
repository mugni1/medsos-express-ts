"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const blob_1 = require("@vercel/blob");
const response_1 = require("../../utils/response");
const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) {
        return (0, response_1.response)({ res, message: 'No file uploaded', status: 400 });
    }
    try {
        const uploadedFile = await (0, blob_1.put)(`/uploads/${Date.now()}-${file.originalname}`, file.buffer, {
            access: 'public',
        });
        return (0, response_1.response)({ res, message: 'File uploaded successfully', status: 200, data: uploadedFile });
    }
    catch {
        return (0, response_1.response)({ res, message: 'Internal server error', status: 500 });
    }
};
exports.uploadFile = uploadFile;
const deleteFile = async (req, res) => {
    const url = req?.query?.url || "";
    try {
        await (0, blob_1.del)(url);
        return (0, response_1.response)({ res, message: 'File deleted successfully', status: 200 });
    }
    catch {
        return (0, response_1.response)({ res, message: 'Internal server error', status: 500 });
    }
};
exports.deleteFile = deleteFile;
