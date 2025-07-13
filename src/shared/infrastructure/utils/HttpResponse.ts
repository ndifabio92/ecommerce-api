import { Response } from "express";

export const httpResponse = {
  success: (res: Response, data: any, message = "Success") => {
    return res.status(200).json({ success: true, message, data });
  },
  badRequest: (res: Response, message = "Bad Request") => {
    return res.status(400).json({ success: false, message });
  },
  unauthorized: (res: Response, message = "Unauthorized") => {
    return res.status(401).json({ success: false, message });
  },
  forbidden: (res: Response, message = "Forbidden", error = "CORS Error") => {
    return res.status(403).json({ success: false, error, message });
  },
  notFound: (res: Response, message = "Not Found") => {
    return res.status(404).json({ success: false, message });
  },
  internalServer: (
    res: Response,
    error = "Internal Server Error",
    message = "An unexpected error occurred."
  ) => {
    return res.status(500).json({ success: false, error, message });
  },
};
