const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const upload = require("../multerConfig");
const { body } = require("express-validator");
const { authenticate } = require("../jwt-config");

router.get(
  "/cardPermissions/:cardId",
  authenticate,
  cardController.getCardPermissions
);

router.post(
  "/",
  upload.single("cardImage"),
  [
    body("deckId", "Unknown deck").notEmpty(),
    body("name", "Your name is required").notEmpty(),
  ],
  cardController.createCard
);

router.delete("/:cardId", authenticate, cardController.deleteCard);

router.get("/:cardId", cardController.getCard);

router.patch(
  "/:cardId",
  upload.single("cardImage"),
  authenticate,
  cardController.updateCard
);

module.exports = router;
