import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  subs: mongoose.Schema.Types.ObjectId;
  quantity: number;
  sold: number;
  shipping: string;
  color: string;
  brand: string;
  images: ArrayConstructor;
  ratings?: [
    {
      rating: number;
      postedBy: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
    }
  ];
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      text: true,
      maxlength: 32,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    },
    images: {
      type: Array,
    },
    ratings: [
      {
        rating: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProduct>("Product", productSchema);
