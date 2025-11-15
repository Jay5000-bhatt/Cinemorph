import User from "../models/Users.js";
import jwt from "jsonwebtoken";

import { generateMail, failureResponse, successResponse } from "./utils.js";

const saltRounds = 10;
const secret = "mysecret";


export const signUp = async (req, res) => {
	try {
		const { email, password, role, profileInformation, address, payment } = req.body;

		const user = new User({
			email,
			password: password,
			role,
			profileInformation,
			address,
			payment,
		});
		const newUser = await user.save();

		successResponse(res, "User Created Successfully", 201);
	} catch (error) {
		failureResponse(res, error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			failureResponse(res, "Please provide email and password", 400);
			return;
		}

		const user = await User.findOne({ email });
		if (!user) {
			failureResponse(res, "User not found", 400);
			return;
		}

		if (password !== user.password) {
			failureResponse(res, "Password is incorrect", 400);
			return;
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email, role: user.role },
			secret,
			{ expiresIn: "1h" }
		);

		successResponse(res, { message: "Login Successful", token, email: user.email });
	} catch (error) {
		failureResponse(res, error);
	}
};

export const changePassword = async (req, res) => {
	try {
		const { email, password, newPassword } = req.body;

		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		if (password !== user.password) {
			failureResponse(res, "Password is incorrect", 400);
			return;
		}

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{ password: newPassword },
			{ new: true }
		);

		return res.status(201).json({ message: "Password changed successfully" });
	} catch (error) {
		console.error("Error in changePassword:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export const generateOtp = async (req, res) => {
	try {
		const email = req.body.email;
		let user = await User.findOne({ email });
		if (user) {

			let otp = Math.ceil(Math.random() * 1000000);
			await User.findOneAndUpdate(
				{ email },
				{ token: otp, token_expiry: Date.now() }
			);

			generateMail(
				email,
				"OTP for password reset",
				`<h1>${otp}</h1> for resetting the password.`
			)
				.then((message) => {
					return res.status(200).json({ message: message });
				})
				.catch((err) => {
					return res.status(500).json({ error: err });
				});
		} else {
			return res.status(400).json({ message: "User not found" });
		}
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

export const verifyOtp = async (req, res) => {
	try {
		const { email, otp, password } = req.body;

		let user = await User.findOne({ email });
		if (user) {
			if (user.token == otp) {

				const currentTime = Date.now();
				const expiryTime = user.token_expiry + 10 * 60 * 1000;
				if (currentTime > expiryTime) {
					return res.status(400).json({ message: "OTP is expired" });
				} else {
					const hashPassword = await bcrypt.hash(password, saltRounds);

					await User.findOneAndUpdate(
						{ email },
						{ password: hashPassword, token: null, token_expiry: null }
					);
					return res
						.status(201)
						.json({ message: "Password changed successfully" });
				}
			} else {
				return res.status(400).json({ message: "OTP is incorrect" });
			}
		} else {
			return res.status(400).json({ message: "User not found" });
		}
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const email = req.user.email;
		const { profileInformation, address } = req.body;

		let user = await User.findOne({ email });
		if (user) {
			if (profileInformation) {
				user.profileInformation = profileInformation;
			}
			if (address) {
				user.address = address;
			}
			await user.save();
			return res.status(201).json({ message: "Profile updated successfully" });
		} else {
			return res.status(400).json({ message: "User not found" });
		}
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};

export const createPayment = async (req, res) => {
	try {
		const id = req.user.id;
		let user = await User.findOne({ _id: id });

		if (user) {
			let successPayment = true
			if (successPayment) {
				user.payment.paidMembership = true;
				user.payment.startDate = new Date();
				user.payment.endDate = new Date();
				user.payment.endDate.setDate(user.payment.startDate.getDate() + 30);
				await user.save();
				successResponse(res, "Payment Successful", 201);
			} else {
				failureResponse(res, "Payment Failed", 400);
			}
		} else {
			failureResponse(res, "User not found", 404);
		}
	} catch (error) {
		failureResponse(res, error);
	}
};
