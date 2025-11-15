import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import User from "../models/Users.js";

import {
	signUp,
	login,
	changePassword,
	generateOtp,
	verifyOtp,
	updateProfile,
	createPayment,
} from "../controllers/UserController.js";

import { authenticate } from "../middleware/auth.js";

router.post("/signup", signUp);
router.post("/login", login);
router.put("/change", authenticate, changePassword);
router.post("/generate-otp", authenticate, generateOtp);
router.post("/verify-otp", authenticate, verifyOtp);
router.put("/update", authenticate, updateProfile);
router.post("/payment", authenticate, createPayment);

export default router;
