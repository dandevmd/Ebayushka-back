import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { verifyToken, verifyAdmin } from "../midwares";

const orderRouter: Router = Router();

orderRouter.post("/create-order", verifyToken, orderController.createOrder);
orderRouter.get(
  "/get-user-orders",
  verifyToken,
  orderController.getUsersOrders
);
orderRouter.get("/get-order/:id", verifyToken, orderController.getOrderById);
orderRouter.get("/get-all", verifyToken, verifyAdmin, orderController.getAll);

orderRouter.put(
  "/update-order",
  verifyToken,
  verifyAdmin,
  orderController.updateOrder
);
orderRouter.delete(
  "/delete-order",
  verifyToken,
  verifyAdmin,
  orderController.deleteOrder
);

export default orderRouter;
