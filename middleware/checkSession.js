const { handleError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleError(res, "Need to start section", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleError(res, "No Payload information found", 401);
      return;
    }

    if (!dataToken._id) {
      handleError(res, "Invalid Token", 401);
      return;
    }

    const user = await userModel.findOne({
      _id: dataToken._id,
    });
    req.user = user;

    next();
  } catch (e) {
    handleError(res, "No section started", 401);
  }
};

module.exports = authMiddleware;
