import { User } from "../../../users/domain/entities/User";
import { Auth } from "../entities/Auth";

export interface IAuthRepository {
  login(email: string, password: string): Promise<Auth>;
  validateToken(token: string): Promise<User | null>;
  generateToken(user: User): string;
  hashPassword(password: string): string;
  comparePassword(password: string, hash: string): boolean;
}
