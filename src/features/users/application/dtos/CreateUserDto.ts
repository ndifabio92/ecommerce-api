import { UserRole } from "../../domain/entities/User";

export interface CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  role?: UserRole;
}
