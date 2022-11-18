import { Router } from "express";
import { authController } from "../controllers/authController";
import { verifyAdmin, verifyToken } from "../midwares";

const authRouter = Router();

authRouter.get("/current-user", verifyToken, authController.getCurrentUser);
authRouter.post(
  "/create-or-update",
  verifyToken,
  authController.createOrUpdate
);
authRouter.get(
  "/current-admin",
  verifyToken,
  verifyAdmin,
  authController.getCurrentUser
);

export default authRouter;
