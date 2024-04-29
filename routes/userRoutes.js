const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../validators/userValidators");

router.post("/register", validateUserRegistration, userController.registerUser);
router.post("/login", validateUserLogin, userController.loginUser);

module.exports = router;
