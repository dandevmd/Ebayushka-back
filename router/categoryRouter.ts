import { Router } from "express";
import { verifyToken, verifyAdmin } from "../midwares";
import { categoryController } from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/all", categoryController.list);
categoryRouter.get("/get/:slug", categoryController.read);

categoryRouter.post(
  "/create",
  verifyToken,
  verifyAdmin,
  categoryController.create
);
categoryRouter.put(
  "/update/:slug",
  verifyToken,
  verifyAdmin,
  categoryController.update
);
categoryRouter.delete(
  "/remove/:slug",
  verifyToken,
  verifyAdmin,
  categoryController.remove
);

export default categoryRouter;
