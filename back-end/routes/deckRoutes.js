const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");
const upload = require("../multerConfig");

router.get("/accessCodes", deckController.getaccessCodes);

router.get("/deckTemplate/:deckId", deckController.getDeckTemplate);

router.get("/:deckId", deckController.getDeck);

router.post("/", upload.single("cardImage"), deckController.createDeck);

router.patch("/:deckId", deckController.updateDeck);

router.delete("/:deckId", deckController.deleteDeck);

module.exports = router;
