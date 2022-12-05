import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title:String,
        price: Number,
        count: Number,
        color: String,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model("Cart", cartSchema);
