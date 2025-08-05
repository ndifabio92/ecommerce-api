import { User, UserRole } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { IAuthRepository } from "../../../auth/domain/repositories/IAuthRepository";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authRepository: IAuthRepository
  ) {}

  async execute(userData: CreateUserDto): Promise<User> {
    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Encriptar la contraseña
    const hashedPassword = this.authRepository.hashPassword(userData.password);

    // Crear el usuario con la contraseña encriptada
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
      role: userData.role || UserRole.USER, // Usar el rol proporcionado o USER por defecto
    };
    console.log("Creating user:", userWithHashedPassword);
    return await this.userRepository.create(userWithHashedPassword);
  }
}
