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

const validateIfPlayerExist = async (model, player) => {
  const card = await model
    .find({
      playerName: {
        $regex: player.playerName.trim().replace(" ", ""),
        $options: "i",
      },
    })
    .find({
      playerLastName: {
        $regex: player.playerLastName.trim().replace(" ", ""),
        $options: "i",
      },
    })
    .find({
      teamName: {
        $regex: player.teamName.trim().replace(" ", ""),
        $options: "i",
      },
    });

  if (card.length >= 1) {
    return true;
  }

  return false;
};

module.exports = { validatorGetCard, validatorCreateCard, validateIfPlayerExist };
