import { Request, Response, NextFunction } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { UserModel } from "../models/UserModel";
import mongoose from "mongoose";

class AuthController {
  createOrUpdate = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const { name, email, picture, user_id } = req.user;

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        // uid:user_id,
        name: email.split("@")[0],
        picture,
        email,
      },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).send(updatedUser);
    }

    const newUSer = new UserModel({
      // uid:user_id,

      name: email.split("@")[0],
      email,
      picture,
    }).save();

    return res.status(201).send(newUSer);
  });

  getCurrentUser = safe(async (req: Request, res: Response) => {
    //@ts-ignore
    const { email } = req.user;

    const currentUser = await UserModel.findOne({ email });
    if (!currentUser) {
      return res.status(404).send("There is not a current user.");
    }

    res.status(200).send(currentUser);
  });
}

export const authController = new AuthController();
