const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const upload = require("../multerConfig");

router.post("/", upload.single("cardImage"), cardController.createCard);

//  axios.delete('baseUrl/card', { data: {userId, deckId} })
router.delete("/:cardId", cardController.deleteCard);

router.get("/:cardId", cardController.getCard);

router.patch("/:cardId", cardController.updateCard);

module.exports = router;
