import { Router } from "express";
import { addToCart, deleteFromCart, getCart, loginUser, registerUser } from "../Controllers/userController.js";
import { createFeedback, deleteFeedback, getFeedbacks } from "../Controllers/feedbackController.js";

const router = Router()

router.post("/auth/register", registerUser)
router.post("/auth/login", loginUser)
router.post("/auth/addToCart", addToCart)
router.post("/auth/getCartItems", getCart)
router.post("/auth/deleteCartItems", deleteFromCart)
router.post("/feedback", createFeedback)
router.post("/getFeedback", getFeedbacks)
router.post("/deleteFeedback", deleteFeedback)


export default router