import nodemailer from "nodemailer";

export const generateMail = (to, subject, body) => {
	return new Promise((resolve, reject) => {
		const email = "bhattjay114@gmail.com";

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: email,
				pass: "ielo mlqj ircy crmw",
			},
		});

		const mailOptions = {
			from: email,
			to: "bhattjay404@gmail.com",
			subject: subject,
			html: body,
		};

		transporter.sendMail(mailOptions, (err) => {
			if (err) reject(err);
			else resolve("Email sent to: " + to + " successfully.");
		});
	});
};

export const successResponse = (res, data, statusCode = 200) => {
	return res.status(statusCode).json(data);
};

export const failureResponse = (res, error, statusCode = 500) => {
	return res.status(statusCode).json(error);
};