export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  cart?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
