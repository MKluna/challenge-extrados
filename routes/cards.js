const express = require("express");
const router = express.Router();
const {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard
} = require("../controllers/cards");
const {
  validatorGetCard,
  validatorCreateCard
} = require("../validators/cards");

router.get("/", getCards);
router.get("/:id", validatorGetCard, getCardById);
router.post(
  "/",
  // authMiddleware,
  // checkRol(["user", "admin"]),
  validatorCreateCard,
  createCard
);
router.put(
  "/:id",
  // authMiddleware,
  validatorGetCard,
  validatorCreateCard,
  updateCard
);
router.delete("/:id",
  // authMiddleware,
  // checkRol(["user", "admin"]),
  validatorGetCard,
  deleteCard
)

module.exports = router;
