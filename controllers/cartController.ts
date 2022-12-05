import safe from "@mcrowe/safe-async-express-errors";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { IProduct, ProductModel } from "../models/ProductModel";
import { CartModel } from "../models/CartModel";
import mongoose from "mongoose";
import { exec } from "child_process";

class CartController {
  savedCart = safe(async (req: Request, res: Response) => {
    const { cart } = req.body;

    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();

    //check if already exist
    const userCartExists = await CartModel.findOne({ orderBy: user?._id });

    if (userCartExists) {
      userCartExists.remove();
      console.log("cart removed");
    }


    const products = cart.map((element: any) => {
      const obj = {
        product: element._id,
        title:element.title,
        price: element.price,
        count: element.count,
        color: element.color,
      };
      return obj;
    });

    const totalPrice = products.reduce((a: any, i: any) => {
      return a + i.count * i.price;
    }, 0);

    const newCart = await new CartModel({
      //i dont know why but it saves in arrray only the id field
      products: products,
      cartTotal: totalPrice,
      orderBy: user?._id,
    }).save();


    res.status(201).send({ ok: true });
  });

  getCart = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();

    const cart = await CartModel.findOne({
      orderBy: user && user._id,
    })
      .populate("products.product", "title")
      .exec();

    const { products, cartTotal } = cart as any;

    res.send({ products, cartTotal });
  });

  deleteCart = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const user = await UserModel.findOne({ email: req.user.email }).exec();

    const cart = await CartModel.findOneAndRemove({
      orderBy: user && user._id,
    });

    res.send({ ok: true });
  });
}

export const cartController = new CartController();
