import { Request, Response, NextFunction } from "express";
import { httpResponse } from "../infrastructure/utils/httpResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err && err.message && err.message.startsWith("CORS: Origin")) {
    httpResponse.forbidden(res, err.message);
  }

  console.error("Unexpected error:", err);
  httpResponse.internalServer(res);
};
