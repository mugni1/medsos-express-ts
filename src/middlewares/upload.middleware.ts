import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { response } from "../utils/response";

const storage = multer.memoryStorage();

export const uploadMiddleware = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

export const handleMulterErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    return response({ message: err.message, res, status: 400 });
  }
  next();
};