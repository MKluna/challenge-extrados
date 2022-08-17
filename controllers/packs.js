const { matchedData } = require("express-validator");
const { packModel } = require("../models");
const { handleError } = require("../utils/handleError");
const {
  formatedDate,
  ifPlayerExistInAnotherPack,
  ifPlayerNotExist,
  ifExistPack,
  ifExistCardInPack,
} = require("../validators/pack");

const getPacks = async (req, res) => {
  try {
    const data = await packModel.find({});
    res.send({ data });
  } catch (error) {
    handleError(res, "Error in obtaining packs", 403);
  }
};

const getPackByPackNumber = async (req, res) => {
  try {
    req = matchedData(req);
    const { idPackage } = req;
    const data = await packModel.findOne({ idPackage });
    if (!data) {
      return handleError(
        res,
        `The pack with the id: ${id} does not exist`,
        403
      );
    }
    res.send({ data });
  } catch (error) {
    handleError(res, "Error in obtaining pack", 500);
  }
};

const createPack = async (req, res) => {
  try {
    const body = matchedData(req);
    const insertPack = body;
    const date = formatedDate(body.dateOfPacking);
    const isValidPlayer = await ifPlayerNotExist(body.idsCards);
    if (isValidPlayer)
      return handleError(
        res,
        "The list of input ids contains one or more invalid ids.",
        404
      );
    const isExistPlayerInAnotherPack = await ifPlayerExistInAnotherPack(
      packModel,
      body.idsCards
    );
    if (isExistPlayerInAnotherPack)
      return handleError(
        res,
        "ID list contains one or more IDs registered to another package.",
        404
      );
    insertPack["dateOfPacking"] = date;
    insertPack["idPackage"] = Math.random().toString(36).slice(-10);
    const pack = await packModel.create(insertPack);
    res.status(201);
    res.send({ msj: "Pack successfully created", package: pack });
  } catch (error) {
    console.log(error);
    handleError(res, "Error when creating the pack", 500);
  }
};

const updatePack = async (req, res) => {
  try {
    const { idPackage, ...body } = matchedData(req);
    const { dateOfPacking, idsCards } = body;

    if (!await ifExistPack(packModel, idPackage)) {
      return handleError(res, "Package id does not exist.", 404);
    }

    if (dateOfPacking && !idsCards) {
      return await updateDate(dateOfPacking, idPackage, res);
    }

    if (!dateOfPacking && idsCards) {
      return await updateIdsCards(idsCards, idPackage, res);
    }

    if (dateOfPacking && idsCards) {
        return await updateDateAndIdsCards(idsCards, dateOfPacking, idPackage, res);
    }

  } catch (e) {
    console.log(e);
    handleError(res, "Error updating the pack", 500);
  }
};

const deletePack = async (req, res) => {
  try {
    req = matchedData(req);
    const { idPackage } = req;
    if (!(await ifExistPack(packModel, idPackage))) {
      return handleError(res, "Package id does not exist.", 404);
    }

    const deleteResponse = await packModel.delete({ idPackage });
    const data = {
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data }).status(200);
  } catch (e) {
    handleError(res, "Error deleting the pack", 500);
  }
};


const deleteCardInPack = async (req, res) => {
  try {
    req = matchedData(req);
    const { idPackage, idCard } = req;
    if (!(await ifExistPack(packModel, idPackage))) {
      return handleError(res, "Package number does not exist.", 404);
    }

    if (!(await ifExistCardInPack(packModel, idPackage, idCard))) {
      return handleError(res, "The card id does not exist in this package.", 404);
    }


    await packModel.updateOne(
      { idPackage },
      { $pull: { idsCards: { $in: [`${idCard}`] } } }
    );

    res
      .send({
        msj: `The card: ${idCard}  was correctly removed from the package: ${idPackage}`,
      })
      .status(200);
  } catch (e) {
    console.log(e);
    handleError(res, "Error deleting the pack", 500);
  }
};











/* Extra Functions */

const updateDate = async (dateOfPacking, idPackage, res) => {
  const updateDate = formatedDate(dateOfPacking);
  await packModel.findOneAndUpdate(
    { idPackage },
    { dateOfPacking: updateDate }
  );
  res.status(200).send({ msj: "Date Correctly updated" });
};

const updateIdsCards = async (idList, idPackage, res) => {
  const isValidPlayer = await ifPlayerNotExist(idList);
  if (isValidPlayer)
    return handleError(
      res,
      "The list of input ids contains one or more invalid ids.",
      404
    );

  const isExistPlayerInAnotherPack = await ifPlayerExistInAnotherPack(
    packModel,
    idList
  );
  if (isExistPlayerInAnotherPack)
    return handleError(
      res,
      "ID list contains one or more IDs registered to another package.",
      404
    );

  const data = await packModel.findOne({ idPackage });

  if (data.idsCards.length === 10) {
    return handleError(
      res,
      "You cannot add more cards to the pack, the maximum number of cards is 10.",
      409
    );
  }

  await packModel.updateOne({ idPackage },{$push:{idsCards: idList}});

  return res.status(201).send({ msj: "Pack successfully updated"});
};

const updateDateAndIdsCards = async(idList, dateOfPacking, idPackage, res) => {
    const updateDate = formatedDate(dateOfPacking);
  await packModel.findOneAndUpdate(
    { idPackage },
    { dateOfPacking: updateDate }
  );

  const isValidPlayer = await ifPlayerNotExist(idList);
  if (isValidPlayer)
    return handleError(
      res,
      "The list of input ids contains one or more invalid ids.",
      404
    );

  const isExistPlayerInAnotherPack = await ifPlayerExistInAnotherPack(
    packModel,
    idList
  );
  if (isExistPlayerInAnotherPack)
    return handleError(
      res,
      "ID list contains one or more IDs registered to another package.",
      404
    );

  const data = await packModel.findOne({ idPackage });

  if (data.idsCards.length === 10) {
    return handleError(
      res,
      "You cannot add more cards to the pack, the maximum number of cards is 10.",
      409
    );
  }

  await packModel.updateOne({ idPackage },{$push:{idsCards: idList}});

  return res.status(201).send({ msj: "Date and Ids Cards successfully updated"});
}

/* Extra Functions */

module.exports = {
  getPacks,
  getPackByPackNumber,
  createPack,
  updatePack,
  deletePack,
  deleteCardInPack
};
