import { Request } from 'express';

export interface GetUsersParams {
  limit: number;
  search: string;
  orderBy: "asc" | "desc";
  sortBy: string;
  offset: number;
}

export interface GetUserQueryParams extends Request {
  user_id?: string;
  query: {
    page?: string;
    limit?: string;
    search?: string;
    orderBy?: "asc" | "desc";
    sortBy?: string;
  };
}