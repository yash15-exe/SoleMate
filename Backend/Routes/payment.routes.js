import { Router } from "express";
import { paymentGateway } from "../Controllers/paymentGateway.js";

const router = Router()

router.post("/payment", paymentGateway)

export default router