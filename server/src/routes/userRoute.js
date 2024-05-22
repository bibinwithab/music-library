const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require("../controllers/userController");

router
  .get("/user", authMiddleware, userController.getUser)
  .put("/user", authMiddleware, userController.updateUser)
  .delete("/user", authMiddleware, userController.deleteUser);

module.exports = router;
