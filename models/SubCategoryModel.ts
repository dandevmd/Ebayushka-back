import mongoose from "mongoose";

export interface IsubCategorySchema {
  name?: string;
  slug: string;
  parent: mongoose.Schema.Types.ObjectId;
}

const subCategorySchema = new mongoose.Schema<IsubCategorySchema>(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
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

export const SubCategoryModel = mongoose.model("Sub", subCategorySchema);
