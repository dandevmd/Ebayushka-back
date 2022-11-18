import { Router } from "express";
import { verifyToken, verifyAdmin } from "../midwares";
import { uploadController } from "../controllers/uploadController";

const uploadRouter = Router();

uploadRouter.get("/get/:id", verifyToken, verifyAdmin, uploadController.read);

uploadRouter.post("/", verifyToken, verifyAdmin, uploadController.create);
uploadRouter.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  uploadController.update
);
uploadRouter.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  uploadController.remove
);

export default uploadRouter;
