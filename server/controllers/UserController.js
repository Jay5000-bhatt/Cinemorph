const User = require("../models/Users");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = "mysecret";

const { generateMail, failureResponse, successResponse } = require("./utils");

const signUp = async (req, res) => {
  try {
    const { email, password, role, profileInformation, address, payment } =
      req.body;
    // const hashPassword = await bcrypt.hash(password, saltRounds);
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

const login = async (req, res) => {
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

    // Check password using your preferred method (e.g., hashing and comparing)
    if (password !== user.password) {
      failureResponse(res, "Password is incorrect", 400);
      return;
    }

    // Create a JWT token
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

const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    // const email = req.user.email;

    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // // Compare old password with password in the database
    // const passwordMatch = await bcrypt.compare(password, user.password);

    // if (!passwordMatch) {
    //   return res.status(400).json({ message: "Password is incorrect" });
    // }

    // Check password using your preferred method (e.g., hashing and comparing)
    if (password !== user.password) {
      failureResponse(res, "Password is incorrect", 400);
      return;
    }

    // If password matches, make a hash of the new password
    // const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in the database
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true } // This option ensures that the updated document is returned
    );

    return res.status(201).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 1. API to create OTP
const generateOtp = async (req, res) => {
  try {
    // check if email exists or not

    const email = req.body.email;
    let user = await User.findOne({ email });
    if (user) {
      //generate OTP
      let otp = Math.ceil(Math.random() * 1000000);

      // update OTP and OTP Expiry Time in database
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

// 2. API to verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    // find user by email
    let user = await User.findOne({ email });
    if (user) {
      if (user.token == otp) {
        // check if token_expiry + 10 mins is greater than current time
        const currentTime = Date.now();
        const expiryTime = user.token_expiry + 10 * 60 * 1000;
        if (currentTime > expiryTime) {
          return res.status(400).json({ message: "OTP is expired" });
        } else {
          const hashPassword = await bcrypt.hash(password, saltRounds);
          // update password in database
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

const updateProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const { profileInformation, address } = req.body;
    // find user by email
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

const createPayment = async (req, res) => {
  try {
    // const id = req.body;
    const id = req.user.id;
    // find user by id
    let user = await User.findOne({ _id: id });

    if (user) {
      // 1. Redirect to a payment gateway (assuming this is asynchronous)
      let successPayment = true; // Simulated response received from payment gateway

      if (successPayment) {
        // Update payment information
        user.payment.paidMembership = true;
        user.payment.startDate = new Date();
        user.payment.endDate = new Date();
        user.payment.endDate.setDate(user.payment.startDate.getDate() + 30);

        // Save the updated user
        await user.save();

        // Respond with success
        successResponse(res, "Payment Successful", 201);
      } else {
        // Respond with failure
        failureResponse(res, "Payment Failed", 400);
      }
    } else {
      // Respond with failure if user not found
      failureResponse(res, "User not found", 404);
    }
  } catch (error) {
    // Handle unexpected errors
    failureResponse(res, error);
  }
};

module.exports = {
  signUp,
  login,
  changePassword,
  generateOtp,
  verifyOtp,
  updateProfile,
  createPayment,
};
