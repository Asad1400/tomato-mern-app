import express from "express"
import { placeOrder, verifyOrder, userOrders, listOrders, updateOrders } from "../controllers/orderController.js"
import authMiddleware from "../middlewares/auth.js"

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.post("/list", listOrders);
orderRouter.post("/status", updateOrders);

export default orderRouter;