import express from "express";
import { addToCart, removeFromCart } from "../controllers/cartController.js";
import { checkLoggedIn } from "../middlewares/checkLoggedIn.js";

const router = express.Router();
router.post("/add-to-cart", checkLoggedIn, addToCart);
router.post("/remove-from-cart", checkLoggedIn, removeFromCart);

export { router as cart };
