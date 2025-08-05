import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UpdateUserDto } from "../dtos/UpdateUserDto";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, userData: UpdateUserDto): Promise<User | null> {
    // Verificar si el email ya existe (si se está actualizando)
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(
        userData.email
      );
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already exists");
      }
    }

    return await this.userRepository.update(id, userData);
  }
}
