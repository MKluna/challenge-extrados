const { cardsModel } = require("../models");
const { check, param } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const formatedDate = (date) => {
  const [day, month, year] = date.split("/");
  const dateFormated = new Date(+year, month - 1, +day).toISOString();
  return dateFormated;
};

const ifPlayerNotExist = async (idList) => {
  let idListLowerCase = idList.map((v) => v.toLowerCase());
  const records = await cardsModel.find({ idCard: { $in: idListLowerCase } });

  if (records.length !== idListLowerCase.length) {
    return true;
  }

  return false;
};

const ifPlayerExistInAnotherPack = async (model, idList) => {
  let idListLowerCase = idList.map((v) => v.toLowerCase());
  const records = await model.find({ idsCards: { $in: idListLowerCase } });
  if (records.length >= 1) {
    return true;
  }

  return false;
};

const ifExistPack = async (model,idPackage) => {
  const data = await model.findOne({idPackage})
  if (!data) {
    return false
  }
  return true;
}

const ifExistCardInPack = async (model, idPackage, idCard) => {
  const data = await model.findOne({ idPackage });
  const {idsCards} = data;
  if (idsCards.includes(idCard)) {
    return true
  }
  return false;
};

const validatorPostCard = [
  check("dateOfPacking")
    .exists()
    .notEmpty()
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("The date format should be DD/MM/YYYYYY"),
  check("idsCards")
    .exists()
    .isArray({ min: 1, max: 10 })
    .custom((value) => {
      for (const iterator of value) {
        if (typeof iterator !== "string") {
          throw new Error("The list must contain only string values.");
        }
        if (iterator.length > 6 || iterator < 6) {
          throw new Error(`ID: ${iterator} is not valid`);
        }
      }
      return true
    }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetCardByPackNumber = [
  param("idPackage")
  .exists()
  .isLength({ min: 10, max: 10 }).withMessage("The Id Pack must be 10 characters long.")
  ,
  (req, res, next) => {
    return validateResults(req, res, next);
  },
]

const validatorPutCard = [
  check("dateOfPacking")
    .optional()
    .exists()
    .notEmpty()
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("The date format should be DD/MM/YYYYYY"),
  check("idsCards")
    .exists()
    .isArray({ min: 1, max: 10 })
    .custom((value) => {
      for (const iterator of value) {
        if (typeof iterator !== "string") {
          throw new Error("The list must contain only string values.");
        }
      }
      return true
    }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorDeleteCardInPack = [
  param("idPackage").exists().isLength({ min: 10 , max: 10 }).withMessage("The Id Pack must be 10 characters long."),
  param("idCard").exists().notEmpty().isLength({ min: 6, max: 6 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


module.exports = {
  formatedDate,
  ifPlayerExistInAnotherPack,
  ifPlayerNotExist,
  ifExistPack,
  ifExistCardInPack,
  validatorPostCard,
  validatorGetCardByPackNumber,
  validatorPutCard,
  validatorDeleteCardInPack
};
