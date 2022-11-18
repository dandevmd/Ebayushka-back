import { Request, Response, NextFunction } from "express";
import safe from "@mcrowe/safe-async-express-errors";
import { auth } from "firebase-admin";
import { app } from "../firebaseConfig";
import { UserModel } from "../models/UserModel";

export const verifyToken = safe(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(req, '>>>>>>>>>>>>>>>>>>>..token')
    if (token === null || token === undefined || !token) {
      res.status(401).send("You are not grated ");
      return next();
    }
    const verified = await auth(app).verifyIdToken(token);
    // console.log(verified, 'verified>>>>>>>>>>>>')
    if (!verified) {
      return res.status(404).send("Midware func did not found user");
    }
    //@ts-ignore
    req.user = verified;
    return next();
  }
);
export const verifyAdmin = safe(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    //@ts-ignore
    const { email } = req.user;

    if (!email) {
      res.status(404).send("Unable to verify role.");
      return;
    }

    const adminUser = await UserModel.findOne({ email });
    // console.log(adminUser, "adminUser>>>>>>");
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(401).send("Access Denied");
    }
    console.log("Greating Sir!");
    return next();
  }
);
