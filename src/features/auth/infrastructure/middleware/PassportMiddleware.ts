import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";

export const passportJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "current",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        return httpResponse.internalServer(res, "Authentication error");
      }
      if (!user) {
        return httpResponse.unauthorized(res, "Invalid or expired token");
      }
      (req as any).user = user;
      next();
    }
  )(req, res, next);
};
