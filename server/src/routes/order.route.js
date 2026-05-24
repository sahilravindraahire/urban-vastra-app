import express, { Router } from "express"
import {addOrderItems, getMyOrders, getOrders, updateOrderStatus} from "../controllers/order.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {admin} from "../middlewares/admin.middleware.js"

const orderRouter = express.Router()

orderRouter.post("/", verifyJwt, addOrderItems)
orderRouter.get("/my-orders", verifyJwt, getMyOrders)

orderRouter.get("/", verifyJwt, admin, getOrders)
orderRouter.put("/:id/status", verifyJwt, admin, updateOrderStatus)

export default orderRouter