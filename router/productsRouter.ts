import { Router } from "express";
import { verifyToken, verifyAdmin } from "../midwares";
import { productsController } from "../controllers/productsController";

const productsRouter = Router();

productsRouter.get("/all/:count", productsController.list);
productsRouter.get("/related/:productId", productsController.getRelated);
productsRouter.get("/get/:slug", productsController.read);

//this is actually a get method, but this way its easier to send data in the body
productsRouter.post(
  "/by-seller-and-arrivals",
  productsController.filteredBySellerAndArrivals
);

productsRouter.post(
  "/create",
  verifyToken,
  verifyAdmin,
  productsController.create
);
productsRouter.put(
  "/update/:slug",
  verifyToken,
  verifyAdmin,
  productsController.update
);
productsRouter.delete(
  "/remove/:_id",
  verifyToken,
  verifyAdmin,
  productsController.remove
);

productsRouter.post("/addReview", verifyToken, productsController.createReview);


export default productsRouter;
