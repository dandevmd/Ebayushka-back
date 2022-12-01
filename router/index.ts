import { Router } from "express";
import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import subCategoryRouter from "./subCategoryRouter";
import productsRouter from "./productsRouter";
import uploadRouter from "./uploadRouter";
import cartRouter from "./cartRouter";
import couponRouter from "./couponRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/products", productsRouter);
router.use("/upload", uploadRouter);
router.use('/cart', cartRouter)
router.use('/coupon', couponRouter)

export default router;
