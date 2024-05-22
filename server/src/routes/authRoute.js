const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

router
  .get("/user", authMiddleware, userController.getUser)
  .put("/user", authMiddleware, userController.updateUser)
  .delete("/user", authMiddleware, userController.deleteUser);

module.exports = router;
