import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { Auth } from "../../domain/entities/Auth";
import { User } from "../../../users/domain/entities/User";
import { UserModel } from "../../../users/infrastructure/models/UserModel";
import { envs } from "../../../../shared/config/envs";

export class JwtAuthRepository implements IAuthRepository {
  private readonly JWT_SECRET = envs.jwtSecret || "your-secret-key";
  private readonly SALT_ROUNDS = 10;

  async login(email: string, password: string): Promise<Auth> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = this.comparePassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = this.generateToken({
      id: (user as any)._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      password: user.password,
      cart: user.cart?.toString(),
      role: user.role,
    });

    return {
      token,
      user: {
        id: (user as any)._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        cart: user.cart?.toString(),
        role: user.role,
      },
    };
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      const user = await UserModel.findById(decoded.id);
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
    } catch (error) {
      return null;
    }
  }

  generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.SALT_ROUNDS);
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
