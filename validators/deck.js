const { check, param } = require("express-validator");
const validateResults = require("../utils/handleValidator");
const ObjectId = require('mongoose').Types.ObjectId;

const validatorInsertCardInDeck = [
  check("cards")
    .exists()
    .isArray({ min: 1 })
    .custom((value) => {
      for (const iterator of value) {
        if (typeof iterator !== "string") {
          throw new Error("The list must contain only string values.");
        }
        if (!ObjectId.isValid(iterator)) {
          throw new Error(
            `ID: ${iterator} is not valid`
          );
        }
      }
      return true;
    }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const ifCardExistInDeck = async (model,cards, _id) =>{
  const records = await model.find({ _id, deck: { $in: cards } });
  if (records.length >= 1) {
    return true;
  }
  return false;
}


const ifCardExist = async (model,cards) =>{

  for (const iterator of cards) {
    const card = await model.findOne({_id: iterator})
    if (!card) {
      return false;
    }
  }

  return true;
}

const ifCardExistInMyDeck = async (model,cards) =>{

  for (const iterator of cards) {
    const card = await model.findOne({deck: {
      "$in": [`${iterator}`]
    }})

    if (!card) {
      return false;
    }
  }

  return true;
}

module.exports = { validatorInsertCardInDeck, ifCardExistInDeck, ifCardExist, ifCardExistInMyDeck};
