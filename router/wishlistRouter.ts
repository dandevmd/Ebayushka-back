import { Router } from "express";
import { wishlistController } from "../controllers/wishlistController";
import { verifyToken } from "../midwares";

const wishlistRouter: Router = Router();

wishlistRouter.post("/add-to-wishlist", verifyToken, wishlistController.add);
wishlistRouter.get("/get-all", verifyToken, wishlistController.getAll);
wishlistRouter.put("/remove-from-wishlist", verifyToken, wishlistController.remove);

export default wishlistRouter;
