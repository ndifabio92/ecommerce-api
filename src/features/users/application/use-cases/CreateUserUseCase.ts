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
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = this.authRepository.hashPassword(userData.password);

    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
      role: userData.role || UserRole.USER,
    };
    console.log("Creating user:", userWithHashedPassword);
    return await this.userRepository.create(userWithHashedPassword);
  }
}
