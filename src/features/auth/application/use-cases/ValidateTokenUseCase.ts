import { User } from "../../../users/domain/entities/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class ValidateTokenUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(token: string): Promise<User | null> {
    return await this.authRepository.validateToken(token);
  }
}
