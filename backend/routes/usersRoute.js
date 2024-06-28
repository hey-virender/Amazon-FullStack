import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
} from "../controllers/userController.js";
import { checkLoggedIn } from "../middlewares/checkLoggedIn.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logout);

router.post("/profile", checkLoggedIn, getUserProfile);


export { router as user };
