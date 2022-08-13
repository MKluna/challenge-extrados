const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/checkSession");
const checkRol = require("../middleware/checkRoles");

const {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/cards");

const {
  validatorGetCard,
  validatorCreateCard,
} = require("../validators/cards");

router.get("/", getCards);

router.get("/:id", validatorGetCard, getCardById);

router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateCard,
  createCard
);

router.put(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetCard,
  validatorCreateCard,
  updateCard
);

router.delete(
  "/:id",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetCard,
  deleteCard
);

module.exports = router;
