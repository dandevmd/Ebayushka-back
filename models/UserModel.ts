import mongoose from "mongoose";

export interface IUserSchema {
  // uid?: string;
  name?: string;
  email: string;
  role: string;
  couponsApplied?: string[];
  cart?: any[];
  wishlist?: mongoose.Schema.Types.ObjectId[];
  address?: string;
}

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    // uid: String,
    name: String,
    email: { type: String, required: true, index: true, unique: true },
    role: { type: String, default: "subscriber", required: true },
    cart: { type: Array, default: [] },
    couponsApplied: { type: Array, default: [] },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserSchema>("User", userSchema);
