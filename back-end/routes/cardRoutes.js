const passport = require("passport");
const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const upload = require("../multerConfig");
const { body } = require("express-validator");

router.post(
  "/",
  upload.single("cardImage"),
  [
    body("deckId", "Unknown deck").notEmpty(),
    body("name", "Your name is required").notEmpty(),
  ],
  cardController.createCard
);

//  axios.delete('baseUrl/card', { data: { deckId} })
router.delete(
  "/:cardId",
  passport.authenticate("jwt", { session: false }),
  cardController.deleteCard
);

router.get("/:cardId", cardController.getCard);

router.patch(
  "/:cardId",
  upload.single("cardImage"),
  passport.authenticate("jwt", { session: false }),
  cardController.updateCard
);

module.exports = router;
