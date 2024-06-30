import {Router} from "express"
import { cancelOrder, createOrder, deletOrder, getAllAdminOrders, getAllUserOrders, getOrdersForCancellationRequests, requestOrderForCancellation, updateOrderStatus } from "../Controllers/order.controller.js"
import {  } from "../Controllers/order.controller.js"
const router = Router()

router.post("/order/createOrder", createOrder)
router.post("/order/deleteOrder", deletOrder)
router.post("/order/getAllAdminOrders",getAllAdminOrders)
router.post("/order/cancelOrder",cancelOrder)
router.post("/order/getAllUserOrders",getAllUserOrders)
router.post("/order/requestOrderForCancellation",requestOrderForCancellation)
router.post("/order/updateOrderStatus",updateOrderStatus)
router.post("/order/getOrdersForCancellationRequests",getOrdersForCancellationRequests)

export default router