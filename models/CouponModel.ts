import mongoose, { Document } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      require: "Name is required",
      minlength: [6, "Too short"],
      maxlength: [12, "Too long"],
    },
    expire: {
      type: Date,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export const CouponModel = mongoose.model("Coupon", couponSchema);
