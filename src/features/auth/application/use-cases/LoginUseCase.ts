import { Auth } from "../../domain/entities/Auth";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { LoginDto } from "../dtos/LoginDto";

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginDto): Promise<Auth> {
    return await this.authRepository.login(
      credentials.email, 
      credentials.password
    );
  }
}
