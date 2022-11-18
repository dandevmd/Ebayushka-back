import { Router } from "express";
import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import subCategoryRouter from "./subCategoryRouter";
import productsRouter from "./productsRouter";
import uploadRouter from "./uploadRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/products", productsRouter);
router.use("/upload", uploadRouter);

export default router;
