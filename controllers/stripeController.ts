import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import Stripe from "stripe";
import { UserModel } from "../models/UserModel";
import { CartModel } from "../models/CartModel";
const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2022-11-15",
});

class StripeController {
  createPaymentIntent = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();

    const cart =
      user && (await CartModel.findOne({ orderBy: user._id }).exec());
    const cartTotal = cart && cart?.cartTotal;
    const payment = await stripe.paymentIntents.create({
      amount: cartTotal! * 100,
      currency: "usd",
    });

    res.json({
      clientSec: payment.client_secret,
    });
  });
}

export const stripeController = new StripeController();
