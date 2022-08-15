const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/checkSession");
const checkRol = require("../middleware/checkRoles");
const { insertCard, removeCard, getMyDeck } = require("../controllers/deck");
const { validatorInsertCardInDeck } = require("../validators/deck");

router.put(
  "/insertcardindeck",
  authMiddleware,
  checkRol(["collectionist"]),
  validatorInsertCardInDeck,
  insertCard
);

router.delete(
  "/removecards",
  authMiddleware,
  checkRol(["collectionist"]),
  validatorInsertCardInDeck,
  removeCard
);

router.get("/mydeck",
  authMiddleware,
  checkRol(["collectionist"]),
  getMyDeck
)

module.exports = router;
