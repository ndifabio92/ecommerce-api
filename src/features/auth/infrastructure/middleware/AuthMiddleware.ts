import { Request, Response, NextFunction } from "express";
import { ValidateTokenUseCase } from "../../application/use-cases/ValidateTokenUseCase";
import { JwtAuthRepository } from "../repositories/JwtAuthRepository";
import { UserRole } from "../../../users/domain/entities/User";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";

type AuthOptions = {
  roles?: UserRole[];
  optional?: boolean;
};

export const AuthMiddleware = (options: AuthOptions = {}) => {
  const { roles = [UserRole.USER, UserRole.ADMIN], optional = false } = options;

  const authRepository = new JwtAuthRepository();
  const validateTokenUseCase = new ValidateTokenUseCase(authRepository);

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        if (optional) {
          return next();
        }
        httpResponse.unauthorized(res, "Authentication required");
        return;
      }

      const user = await validateTokenUseCase.execute(token);

      if (!user) {
        if (optional) {
          return next();
        }
        httpResponse.unauthorized(res, "Invalid or expired token");
        return;
      }

      if (roles.length > 0 && !roles.includes(user.role)) {
        httpResponse.forbidden(res, "Access denied");
        return;
      }

      (req as any).user = user;
      next();
    } catch (error) {
      if (optional) {
        return next();
      }
      httpResponse.unauthorized(res, "Authentication failed");
    }
  };
};

export const AuthUser = () => AuthMiddleware({ roles: [UserRole.USER] });
export const AuthAdmin = () => AuthMiddleware({ roles: [UserRole.ADMIN] });
export const AuthAny = () => AuthMiddleware();
export const AuthOptional = () => AuthMiddleware({ optional: true });
