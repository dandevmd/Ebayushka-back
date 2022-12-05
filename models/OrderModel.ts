import mongoose from "mongoose";

export interface IorderProduct {}

export interface Iorder {
  products: IorderProduct[];
}

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        title: String,
        price: Number,
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Pending",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
