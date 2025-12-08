import { Request, Response } from "express";
import { GetUserQueryParams } from "../types/user.type";
import { response } from "../utils/response";
import { getUserByUsernameService, getUserService } from "../services/";
import { getRandomNumber } from "../utils/random";

export const getUsers = async (req: GetUserQueryParams, res: Response) => {
  const page = req.query.page || "1";
  const limit = req.query.limit || "10";
  const search = req.query.search || "";
  const orderBy = req.query.orderBy || "asc";
  const sortBy = req.query.sortBy || "id";
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const users = await getUserService({ orderBy, sortBy, search, offset, limit: parseInt(limit) });
    const meta = { total: users.length, page: parseInt(page), limit: parseInt(limit), offset, orderBy, sortBy, search };
    response({ res, status: 200, message: "Users fetched successfully", data: users, meta })
  } catch (error: any) {
    response({ res, status: 500, message: "Internal Server Error" })
  }
};

export const getUsersRandom = async (req: GetUserQueryParams, res: Response) => {
  const randomNumber = getRandomNumber(5)
  let orderBy: "asc" | "desc" = "asc";
  let sortBy: "id" | "name" | "email" | "createdAt" = "id";
  
  if (randomNumber == 0) {
    orderBy = "desc";
    sortBy = "email";
  } else if (randomNumber == 1) {
    orderBy = "asc";
    sortBy = "name";
  } else if (randomNumber == 2) {
    orderBy = "desc";
    sortBy = "name";
  } else if (randomNumber == 3) {
    orderBy = "asc";
    sortBy = "email";
  } else if (randomNumber == 4) {
    orderBy = "desc";
    sortBy = "createdAt";
  } else if (randomNumber == 5) {
    orderBy = "asc";
    sortBy = "createdAt";
  } else {
    orderBy = "asc";
    sortBy = "id";
  }

  try {
    const users = await getUserService({ orderBy, sortBy, search: "", offset: 0, limit: 5 });
    response({ res, status: 200, message: "Users fetched successfully", data: users })
  } catch (error: any) {
    response({ res, status: 500, message: "Internal Server Error" })
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const user = await getUserByUsernameService(username);
    if (!user) {
      return response({ res, status: 404, message: "User not found" });
    }
    response({ res, status: 200, message: "User fetched successfully", data: user });
  } catch (error: any) {
    response({ res, status: 500, message: "Internal Server Error" })
  }
};
