const express = require("express");
const authMiddleware = require("../middleware/checkSession");
const checkRol = require("../middleware/checkRoles");
const {
  getPacks,
  getPackByPackNumber,
  createPack,
  updatePack,
  deletePack,
  deleteCardInPack,
} = require("../controllers/packs");
const {
  validatorPostCard,
  validatorGetCardByPackNumber,
  validatorPutCard,
  validatorDeleteCardInPack,
} = require("../validators/pack");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorPostCard,
  createPack
);
router.get("/", getPacks);
router.get(
  "/:idPackage",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetCardByPackNumber,
  getPackByPackNumber
);
router.put(
  "/:idPackage",
  authMiddleware,
  checkRol(["admin"]),
  validatorPutCard,
  validatorGetCardByPackNumber,
  updatePack
);
router.delete(
  "/:idPackage",
  authMiddleware,
  checkRol(["admin"]),
  validatorGetCardByPackNumber,
  deletePack
);
router.delete(
  "/cardinpack/:idPackage/:idCard",
  validatorDeleteCardInPack,
  deleteCardInPack
);

module.exports = router;
