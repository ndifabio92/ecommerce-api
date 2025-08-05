import { User } from "../entities/User";
import { CreateUserDto } from "../../application/dtos/CreateUserDto";
import { UpdateUserDto } from "../../application/dtos/UpdateUserDto";

export interface IUserRepository {
  create(userData: CreateUserDto): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, userData: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
