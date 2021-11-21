const passport = require("passport");
const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");
const upload = require("../multerConfig");
const { body } = require("express-validator");
const { authenticate } = require("../jwt-config");

router.get("/deckId/:accessCode", deckController.getDeckIdFromAccessCode);

router.get("/deckTemplate/:deckId", deckController.getDeckTemplate);

router.get("/deckDetails/:deckId", deckController.getDeckDetails);

router.get(
  "/deckPermissions/:deckId",
  authenticate,
  deckController.getDeckPermissions
);

router.get("/:deckId", deckController.getDeck);

router.post(
  "/",
  upload.single("cardImage"),
  body("deckName", "Deck name is required").notEmpty(),
  deckController.createDeck
);

router.patch(
  "/:deckId",
  body("deckName", "Deck name is required").notEmpty(),
  authenticate,
  deckController.updateDeck
);

router.delete("/:deckId", authenticate, deckController.deleteDeck);

module.exports = router;
