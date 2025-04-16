const express = require("express");
const userController = require("../controllers/userController.js");
const isAuthenticated = require("../middlewares/auth.js");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/password/forgotpassword",userController.forgetHandler);

module.exports = router;
