import { Document, model, Schema, Types } from "mongoose";
import { User, UserRole } from "../../domain/entities/User";

type UserDocument = User & Document;

const UserSchema = new Schema<UserDocument>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    age: {
      type: Number,
      required: true,
      min: [0, "Age must be positive"],
      max: [120, "Age must be realistic"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    cart: { type: Types.ObjectId, ref: "Cart" },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<UserDocument>("User", UserSchema);
