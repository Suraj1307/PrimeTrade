const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  registerValidation,
  loginValidation
} = require("../validators/authValidators");

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
