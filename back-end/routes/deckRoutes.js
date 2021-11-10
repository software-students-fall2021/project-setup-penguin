const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");

router.get("/accessCodes", deckController.getaccessCodes);

router.get("/deckTemplate/:deckId", deckController.getDeckTemplate);

router.get("/:deckId", deckController.getDeck);

router.post("/", deckController.createDeck);

router.patch("/:deckId", deckController.updateDeck);

router.delete("/:deckId", deckController.deleteDeck);

module.exports = router;
