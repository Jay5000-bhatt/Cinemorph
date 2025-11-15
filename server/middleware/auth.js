import jwt from "jsonwebtoken";
import { failureResponse } from "../controllers/utils.js";
import User from "../models/Users.js";

export const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, "mysecret");
		req.user = decoded;
		let flag = await checkPaidMembership(decoded.id);
		if (flag) {
			next();
		} else {
			failureResponse(res, "Invalid membership", 401);
		}
	} catch (error) {
		failureResponse(res, error);
	}
};

export const checkPaidMembership = async (userId) => {
	try {
		let user = await User.findById(userId);

		if (!user) {
			return false;
		}

		if (user.payment && user.payment.paidMembership) {
			if (user.payment.endDate > Date.now()) {
				return true;
			} else {
				user.payment.paidMembership = false;
				user.payment.endDate = null;
				user.payment.startDate = null;
				await user.save();
				return false;
			}
		} else {
			return false;
		}
	} catch (error) {
		console.error(error);
		throw new Error("Error checking paid membership");
	}
};