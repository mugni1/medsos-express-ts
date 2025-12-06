"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = ({ res, status = 200, message, data = null, errors = null, meta = null }) => {
    res.status(status).json({ status: status, message: message, data: data, meta: meta, errors: errors });
};
exports.response = response;
