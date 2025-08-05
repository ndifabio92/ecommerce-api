import { Request, Response, NextFunction } from "express";
import { ValidateTokenUseCase } from "../../application/use-cases/ValidateTokenUseCase";
import { JwtAuthRepository } from "../repositories/JwtAuthRepository";
import { UserRole } from "../../../users/domain/entities/User";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";

export const requireRole = (...allowedRoles: UserRole[]) => {
  const authRepository = new JwtAuthRepository();
  const validateTokenUseCase = new ValidateTokenUseCase(authRepository);

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return httpResponse.unauthorized(res, "No token provided");
      }

      const user = await validateTokenUseCase.execute(token);
      if (!user) {
        return httpResponse.unauthorized(res, "Invalid token");
      }

      if (!allowedRoles.includes(user.role)) {
        return httpResponse.forbidden(
          res,
          `Access denied. Required roles: ${allowedRoles.join(", ")}`
        );
      }

      (req as any).user = user;
      next();
    } catch (error) {
      return httpResponse.unauthorized(res);
    }
  };
};

export const requireUserRole = () => requireRole(UserRole.USER);

export const requireAdminRole = () => requireRole(UserRole.ADMIN);

export const requireAnyAuthenticatedUser = () =>
  requireRole(UserRole.USER, UserRole.ADMIN);
