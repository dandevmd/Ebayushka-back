import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { UserModel } from "../models/UserModel";
import { OrderModel } from "../models/OrderModel";
import { CartModel } from "../models/CartModel";
import { ProductModel } from "../models/ProductModel";
import mongoose from "mongoose";

class OrderController {
  createOrder = safe(async (req: Request, res: Response) => {
    const { stripeResponse: paymentIntent } = req.body;
    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();
    const userCart = await CartModel.findOne({ orderBy: user?._id });
    const products = userCart && userCart?.products;

    if (!products || !paymentIntent) {
      return res.status(400).send("Was not able to create an order");
    }

    const newOrder = await new OrderModel({
      products,
      paymentIntent,
      orderBy: user && user?._id,
    }).save();

    console.log(user?._id, ">>>>>>>>>.>.");

    //decrement quantity , increment sold
    const bulkOptions = products.map((i) => {
      return {
        updateOne: {
          filter: { _id: i.product?._id },
          update: {
            $inc: { quantity: -i.count!, sold: +i.count! },
          },
        },
      };
    });

    //apply the quntity and sold changes by bulking the arrray
    const updatedProducts = ProductModel.bulkWrite(bulkOptions, {});

    res.status(201).json({ ok: true });
  });
  getAll = safe(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({}).populate("orderBy").exec();

    orders && res.send(orders);
  });

  getUsersOrders = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();
    const orders = await OrderModel.find({ orderBy: user?._id }).exec();
    //@ts-ignore

    orders && res.send(orders);
  });
  getOrderById = safe(async (req: Request, res: Response) => {});
  updateOrder = safe(async (req: Request, res: Response) => {
    const { orderId, orderStatus } = req.body;
    console.log(orderId, orderStatus)

    const updated = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { orderStatus },
      { new: true }
    );

    updated && res.send(updated)
  });

  deleteOrder = safe(async (req: Request, res: Response) => {});
}

export const orderController = new OrderController();
