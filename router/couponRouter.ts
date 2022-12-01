import { Router } from "express";
import { verifyToken, verifyAdmin } from "../midwares";
import { couponController } from "../controllers/couponController";

const couponRouter: Router = Router();

couponRouter.get(
  "/all-coupons",
  verifyToken,
  verifyAdmin,
  couponController.getAllCoupons
);

couponRouter.post(
  "/create-coupon",
  verifyToken,
  verifyAdmin,
  couponController.createCoupon
);

couponRouter.post("/verify-coupon", verifyToken, couponController.verifyCoupon);

couponRouter.delete(
  "/remove-coupon/:id",
  verifyToken,
  verifyAdmin,
  couponController.removeCoupon
);

export default couponRouter;
