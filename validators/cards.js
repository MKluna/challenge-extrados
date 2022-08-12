const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetCard = [
  check("id")
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("The ID must be 6 characters long."),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorCreateCard = [
  check("idCard").not().exists().withMessage("Unable to send card ID."),
  check("playerName").exists().notEmpty(),
  check("playerLastName").exists().notEmpty(),
  check("playerRole").exists().notEmpty(),
  check("teamName").exists().notEmpty(),
  check("rarity", "Valid values are : bronce , plata , oro , platino")
    .exists()
    .notEmpty()
    .isIn(["bronce", "plata", "oro", "platino"]),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = { validatorGetCard, validatorCreateCard };
