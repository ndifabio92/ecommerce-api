import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { GetUserUseCase } from "../../application/use-cases/GetUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/GetAllUsersUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { httpResponse } from "../../../../shared/infrastructure/utils/HttpResponse";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      // No devolvemos la contraseña en la respuesta
      const { password, ...userWithoutPassword } = user;
      res
        .status(201)
        .json({
          success: true,
          message: "User created successfully",
          data: userWithoutPassword,
        });
    } catch (error) {
      if (error instanceof Error && error.message === "Email already exists") {
        httpResponse.badRequest(res, error.message);
      } else {
        httpResponse.internalServer(res);
      }
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.getUserUseCase.execute(id);

      if (!user) {
        return httpResponse.notFound(res, "User not found");
      }

      // No devolvemos la contraseña en la respuesta
      const { password, ...userWithoutPassword } = user;
      httpResponse.success(res, userWithoutPassword);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.getAllUsersUseCase.execute();
      // No devolvemos las contraseñas en la respuesta
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      httpResponse.success(res, usersWithoutPasswords);
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.updateUserUseCase.execute(id, req.body);

      if (!user) {
        return httpResponse.notFound(res, "User not found");
      }

      // No devolvemos la contraseña en la respuesta
      const { password, ...userWithoutPassword } = user;
      httpResponse.success(res, userWithoutPassword);
    } catch (error) {
      if (error instanceof Error && error.message === "Email already exists") {
        httpResponse.badRequest(res, error.message);
      } else {
        httpResponse.internalServer(res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await this.deleteUserUseCase.execute(id);

      if (!deleted) {
        return httpResponse.notFound(res, "User not found");
      }

      httpResponse.success(res, { message: "User deleted successfully" });
    } catch (error) {
      httpResponse.internalServer(res);
    }
  }
}
