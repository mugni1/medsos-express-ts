"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    }
    catch (error) {
        return null;
    }
};
exports.decodeToken = decodeToken;
