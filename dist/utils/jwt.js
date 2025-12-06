import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
};
export const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    }
    catch (error) {
        return null;
    }
};
