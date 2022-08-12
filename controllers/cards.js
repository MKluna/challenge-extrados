const { matchedData } = require("express-validator");
const { cardsModel } = require("../models");
const { handleError } = require("../utils/handleError");

const getCards = async (req, res) => {
  try {
    const data = await cardsModel.find({});
    res.send({ data });
  } catch (error) {
    handleError(res, "Error in obtaining cards", 403);
  }
};

const getCardById = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await cardsModel.findOne({ idCard: id });
    if (!data) {
      return handleError(
        res,
        `The card with the id: ${id} does not exist`,
        403
      );
    }
    res.send({ data });
  } catch (error) {
    handleError(res, "Error in obtaining cards", 500);
  }
};

const createCard = async (req, res) => {
  try {
    const body = matchedData(req);
    body["idCard"] = Math.random().toString(36).slice(-6);
    const data = await cardsModel.create(body);
    res.status(201);
    res.send({ msj: "Card successfully created" });
  } catch (error) {
    handleError(res, "Error when creating the card", 500);
  }
};

const updateCard = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await cardsModel.findOne({ idCard: id });
    if (!data) {
      return handleError(
        res,
        `The card with the id: ${id} does not exist`,
        403
      );
    }
    await cardsModel.findOneAndUpdate(id, body);
    res.send({ msj: "Card Successfully Update" });
  } catch (e) {
    handleError(res, "Error updating the card", 500);
  }
};

const deleteCard = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const deleteResponse = await cardsModel.delete({ idCard: id });
    const data = {
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (e) {
    handleError(res, "Error deleting the card", 500);
  }
};

module.exports = { getCards, getCardById, createCard, updateCard, deleteCard };
