const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .post("/register", authController.registerUser)
  .post("/login", authController.loginUser)
  .get("/logout", authController.logoutUser);

module.exports = router;
