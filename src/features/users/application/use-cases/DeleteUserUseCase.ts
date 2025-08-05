import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
