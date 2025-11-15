import jwt from 'jsonwebtoken';
import { config } from "dotenv"
config();

export interface MyJwtPayload {
  id: string;
  name: string;
  iat: number;
  exp: number;
}

export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '7d' });
};

export const decodeToken = (token: string): MyJwtPayload | null => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY as string) as MyJwtPayload;
  } catch (error) {
    return null;
  }
};