import { User } from "../../../users/domain/entities/User";

export interface Auth {
  token: string;
  user: Omit<User, "password" | "createdAt" | "updatedAt">;
}
