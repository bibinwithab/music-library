require("dotenv").config();

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    newUser.save();

    res.json({
      message: "New user Created",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: `${error}`,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .json({
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: `${error}` });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", { sameSite: "none", secure: true });
  res.json({ message: "logged out successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
