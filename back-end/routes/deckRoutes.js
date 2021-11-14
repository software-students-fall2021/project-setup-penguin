const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");
const upload = require("../multerConfig");
const { body } = require("express-validator");

router.get("/accessCodes", deckController.getAccessCodes);

router.get("/deckTemplate/:deckId", deckController.getDeckTemplate);

router.get("/deckDetails/:deckId", deckController.getDeckDetails);

router.get("/:deckId", deckController.getDeck);

router.post(
  "/",
  body("deckName", "Deck name is required").notEmpty(),
  upload.single("cardImage"),
  deckController.createDeck
);

router.patch(
  "/:deckId",
  body("deckName", "Deck name is required").notEmpty(),
  deckController.updateDeck
);

router.delete("/:deckId", deckController.deleteDeck);

module.exports = router;
