const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/passwordManagement");
const { tokenSigning } = require("../utils/handleJwt");
const { handleError } = require("../utils/handleError");
const { userModel } = require("../models");

const registerController = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSigning(dataUser),
      user: dataUser,
    };
    res.status(201);
    res.send({ data });
  } catch (e) {
    handleError(res, "User could not be registered", 500);
  }
};

const loginController = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await userModel.findOne({ email: req.email });

    if (!user) {
      handleError(res, "User does not exist", 404);
      return;
    }

    const hashPassword = user.get("password");

    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleError(res, "Invalid Password", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSigning(user)
    };

    res.send({ data });
  } catch (e) {
    handleError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerController, loginController };
