import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { CouponModel } from "../models/CouponModel";
import { UserModel } from "../models/UserModel";
import { isInThePast } from "../utils";
import { CartModel } from "../models/CartModel";
import mongoose from "mongoose";

class CouponController {
  getAllCoupons = safe(async (req: Request, res: Response) => {
    const allCoupons = await CouponModel.find({})
      .sort({ createdAt: -1 })
      .exec();

    allCoupons
      ? res.send(allCoupons)
      : res.status(404).send("There is no coupons.");
  });

  createCoupon = safe(async (req: Request, res: Response) => {
    const { name, expire, discount } = req.body;

    const createdCoupon = await new CouponModel({
      name,
      expire,
      discount,
    }).save();

    createdCoupon
      ? res.send(createdCoupon)
      : res.status(400).send("Failed to create new coupon.");
  });

  removeCoupon = safe(async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    await CouponModel.findByIdAndDelete({ _id }).exec();

    res.send({ ok: true });
  });

  verifyCoupon = safe(async (req: Request, res: Response) => {
    const { couponName: name } = req.body;
    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();
    const coupon = await CouponModel.findOne({ name }).exec();
    const expire = coupon?.expire;
    const isExpired = isInThePast(expire!);
    const cart = await CartModel.findOne({
      orderBy: user?._id as mongoose.Types.ObjectId,
    }).exec();
    const totalAfterDiscount =
      cart?.cartTotal &&
      coupon?.discount &&
      (cart?.cartTotal * coupon?.discount) / 100;

    totalAfterDiscount
      ? res.send({ totalAfterDiscount })
      : res.status(400).send("Your coupon is not valid");
  });
}

export const couponController = new CouponController();
