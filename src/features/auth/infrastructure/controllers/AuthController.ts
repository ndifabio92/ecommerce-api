import { Request, Response } from "express";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { ValidateTokenUseCase } from "../../application/use-cases/ValidateTokenUseCase";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private validateTokenUseCase: ValidateTokenUseCase
  ) {}

  async login(req: Request, res: Response) {
    try {
      const auth = await this.loginUseCase.execute(req.body);
      httpResponse.success(res, auth);
    } catch (error) {
      httpResponse.unauthorized(res, "Invalid credentials");
    }
  }

  async current(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (!user) {
        return httpResponse.unauthorized(res);
      }
      // No devolvemos la contraseña en la respuesta
      const { password, ...userWithoutPassword } = user;
      httpResponse.success(res, userWithoutPassword);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }
}
