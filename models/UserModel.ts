import mongoose from "mongoose";

export interface IUserSchema {
  // uid?: string;
  name?: string;
  email: string;
  role: string;
  cart?: any[];
  address?: string;
}

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    // uid: String,
    name: String,
    email: { type: String, required: true, index: true, unique: true },
    role: { type: String, default: "subscriber", required: true },
    cart: { type: Array, default: [] },
    address: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserSchema>("User", userSchema);
