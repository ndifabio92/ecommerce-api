import { Request, Response, NextFunction } from "express";
import { ValidateTokenUseCase } from "../../application/use-cases/ValidateTokenUseCase";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";

export const validateTokenMiddleware = (
  validateTokenUseCase: ValidateTokenUseCase
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return httpResponse.unauthorized(res, "Invalid or expired token");
      }

      const user = await validateTokenUseCase.execute(token);
      if (!user) {
        return httpResponse.unauthorized(res, "Invalid or expired token");
      }

      (req as any).user = user;
      next();
    } catch (error) {
      return httpResponse.unauthorized(res, "Invalid or expired token");
    }
  };
};
