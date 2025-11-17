import { NextFunction, Request, Response } from "express";
import { decodeToken } from "utils/jwt";
import { response } from "utils/response";
import { getUserByIdService } from "@/services";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  if (!token) {
    return response({ res, status: 401, message: "Missing token" });
  }
  const decoded = decodeToken(token);
  if (!decoded) {
    return response({ res, status: 401, message: "Unauthorized" });
  }

  try {
    const user = await getUserByIdService(decoded.id);
    if (!user) {
      return response({ res, status: 401, message: "Unauthorized" });
    }
    req.user_id = user.id;
    return next();
  } catch {
    return response({ res, status: 500, message: "Internal Server Error" });
  }

}
