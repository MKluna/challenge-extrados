const { loginController, registerController } = require("../controllers/auth");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const express = require("express");
const router = express.Router();

router.post("/register", validatorRegister, registerController);
router.post("/login", validatorLogin, loginController);

module.exports = router;
