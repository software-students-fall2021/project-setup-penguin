const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

router.post("/", cardController.createCard);

//  axios.delete('baseUrl/card', { data: {userId, deckId} })
router.delete("/:cardId", cardController.deleteCard);

router.get("/:cardId", cardController.getCard);

router.patch("/:cardId", cardController.updateCard);

module.exports = router;
