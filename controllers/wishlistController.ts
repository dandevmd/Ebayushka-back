import { Request, Response } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { UserModel } from "../models/UserModel";

class WishlistController {
  add = safe(async (req: Request, res: Response) => {
    const { productId } = req.body;

    const pd = await UserModel.findOneAndUpdate(
      //@ts-ignore
      { email: req.user.email },
      { $addToSet: { wishlist: productId } }
    ).exec();

    res.status(201).send({ ok: true });
  });

  remove = safe(async (req: Request, res: Response) => {
    const { productId } = req.body;

    const removedPd = await UserModel.findOneAndUpdate(
      //@ts-ignore
      { email: req.user.email },
      { $pull: { wishlist: productId } }
    ).exec();

    res.status(200).send({ ok: true });
  });

  getAll = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const all = await UserModel.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist")
      .exec();

    res.status(200).send(all);
  });
}

export const wishlistController = new WishlistController();
