import { Request } from 'express';

export interface GetUsersParams {
  limit: number;
  search: string;
  order_by: "asc" | "desc";
  sort_by: string;
  offset: number;
}

export interface GetUserQueryParams extends Request {
  user_id?: string;
  query: {
    page?: string;
    limit?: string;
    search?: string;
    order_by?: "asc" | "desc";
    sort_by?: string;
  };
}