const { matchedData } = require("express-validator");
const { userModel, cardsModel } = require("../models");
const { handleError } = require("../utils/handleError");

const insertCard = async (req, res) => {
  try {
    const { user } = req;
    const { _id } = user;
    const body = matchedData(req);
    let { cards } = body;
    const data = await userModel.findOne({ _id });
    cards.concat(data.deck);
    const cleanArrayIds = [...new Set(cards)];
    await userModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          deck: cleanArrayIds,
        },
      }
    );
    res.send({ msj: "Cards inserted correctly" }).status(201);
  } catch (error) {
    console.log(error);
    handleError(res, "Error when adding cards to your deck", 500);
  }
};

const removeCard = async (req, res) => {
  try {
    const { user } = req;
    const { _id } = user;
    const body = matchedData(req);
    const { cards } = body;
    const cleanArrayIds = [...new Set(cards)];

    for (const iterator of cleanArrayIds) {
      await userModel.updateOne(
        { _id },
        { $pull: { deck: { $in: [`${iterator}`] } } }
      );
    }

    res
      .send({
        msj: "Successfully removed cards",
      })
      .status(200);
  } catch (error) {
    handleError(res, "Error when removing cards from your deck", 500);
  }
};


const getMyDeck = async (req, res) => {
  try {
    const { user } = req;
    const cards = await cardsModel.populate(user, { path: "deck" });
    const { deck } = cards;
    let cleanDeck = [];

    for (const iterator of deck) {
      iterator.set("deleted", undefined, { strict: false });
      iterator.set("updatedAt", undefined, { strict: false });
      cleanDeck.push(iterator);
    }

    res.send({ deck: cleanDeck });
  } catch (error) {
    console.log(error);
    handleError(res, "Error when get your cards from your deck", 500);
  }
};

module.exports = { insertCard, removeCard, getMyDeck };
