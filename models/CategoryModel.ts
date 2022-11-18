import mongoose from "mongoose";

export interface ICategorySchema {
  name?: string;
  slug: string;
}

const categorySchema = new mongoose.Schema<ICategorySchema>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "Too short"],
      maxlength: [20, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = mongoose.model("Category", categorySchema);
