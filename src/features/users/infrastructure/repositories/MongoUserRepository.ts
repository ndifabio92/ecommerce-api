import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { CreateUserDto } from "../../application/dtos/CreateUserDto";
import { UpdateUserDto } from "../../application/dtos/UpdateUserDto";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository {
  async create(userData: CreateUserDto): Promise<User> {
    const user = new UserModel(userData);
    const savedUser = await user.save();

    return {
      id: (savedUser as any)._id.toString(),
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
      age: savedUser.age,
      password: savedUser.password,
      cart: savedUser.cart?.toString(),
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;

    return {
      id: (user as any)._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      password: user.password,
      cart: user.cart?.toString(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return {
      id: (user as any)._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      password: user.password,
      cart: user.cart?.toString(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();

    return users.map((user) => ({
      id: (user as any)._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      password: user.password,
      cart: user.cart?.toString(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async update(id: string, userData: UpdateUserDto): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });

    if (!user) return null;

    return {
      id: (user as any)._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      password: user.password,
      cart: user.cart?.toString(),
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}
