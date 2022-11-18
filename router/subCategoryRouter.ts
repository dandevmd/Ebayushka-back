import { Router } from "express";
import { verifyToken, verifyAdmin } from "../midwares";
import { subCategoryController } from "../controllers/subCategoryController";

const subCategoryRouter = Router();

subCategoryRouter.get("/all", subCategoryController.list);
subCategoryRouter.get("/get/:slug", subCategoryController.read);

subCategoryRouter.post(
  "/create",
  verifyToken,
  verifyAdmin,
  subCategoryController.create
);
subCategoryRouter.put(
  "/update/:slug",
  verifyToken,
  verifyAdmin,
  subCategoryController.update
);
subCategoryRouter.delete(
  "/remove/:slug",
  verifyToken,
  verifyAdmin,
  subCategoryController.remove
);

export default subCategoryRouter;
