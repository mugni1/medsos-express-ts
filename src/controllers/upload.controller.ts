import { Request, Response } from "express";
import { put, del } from "@vercel/blob"
import { response } from "utils/response";

interface DeleteFileQueryParams extends Request {
  query: {
    url?: string;
  };
}

export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return response({ res, message: 'No file uploaded', status: 400 })
  }
  try {
    const uploadedFile = await put(`/uploads/${Date.now()}-${file.originalname}`, file.buffer, {
      access: 'public',
    });
    return response({ res, message: 'File uploaded successfully', status: 200, data: uploadedFile });
  } catch {
    return response({ res, message: 'Internal server error', status: 500 });
  }
};

export const deleteFile = async (req: DeleteFileQueryParams, res: Response) => {
  const url = req?.query?.url || "";
  try {
    await del(url);
    return response({ res, message: 'File deleted successfully', status: 200 });
  } catch {
    return response({ res, message: 'Internal server error', status: 500 });
  }
};