const passport = require("passport");
const express = require("express");
const router = express.Router();
const deckController = require("../controllers/deckController");
const upload = require("../multerConfig");
const { body } = require("express-validator");

router.get("/accessCodes", deckController.getAccessCodes);

router.get("/deckTemplate/:deckId", deckController.getDeckTemplate);

router.get("/deckDetails/:deckId", deckController.getDeckDetails);

router.get(
  "/deckPermissions/:deckId",
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
  deckController.updateDeck
);

router.delete(
  "/:deckId",
  passport.authenticate("jwt", { session: false }),
  deckController.deleteDeck
);

module.exports = router;
