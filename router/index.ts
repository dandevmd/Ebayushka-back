import { Router } from "express";
import authRouter from "./authRouter";
import categoryRouter from "./categoryRouter";
import subCategoryRouter from "./subCategoryRouter";
import productsRouter from "./productsRouter";
import uploadRouter from "./uploadRouter";
import cartRouter from "./cartRouter";
import couponRouter from "./couponRouter";
import stripeRouter from "./stripeRouter";
import orderRouter from "./orderRouter";
import wishlistRouter from  './wishlistRouter'

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/products", productsRouter);
router.use("/upload", uploadRouter);
router.use('/cart', cartRouter)
router.use('/coupon', couponRouter)
router.use('/stripe', stripeRouter)
router.use('/order', orderRouter)
router.use('/wishlist', wishlistRouter)

export default router;
