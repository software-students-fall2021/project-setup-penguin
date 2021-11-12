const Card = require("../models/card");
const Deck = require("../models/deck");
const fs = require("fs").promises;
const db = require("../db.js");

const createCard = async (req, res, next) => {
  const { newCard, deckId, userId } = req.body;
  let cardId;

  const session = await db.startSession();
  await session.withTransaction(async () => {
    // create & save new Card document
    const card = await new Card({
      deckId,
      userId,
      ...newCard,
    })
      .save()
      .catch((err) => {
        next(err);
      });
    cardId = card._id;

    // update Deck document w/ id of newly added Card
    await Deck.findOneAndUpdate(
      { _id: deckId },
      { $push: { cards: cardId } }
    ).catch((err) => {
      next(err);
    });

    // update User document w/ id of newly added Card
    if (userId) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { cards: cardId } }
      );
    }
  });

  session.endSession();
  res.json({ cardId });
};

const deleteCard = (req, res, next) => {
  // current dummy default values since we're not calling the delete endpoint yet
  const { cardId = "a3ac30da-4402-4359-9ffb-9ed5b8a27ba0" } = req.params;
  const {
    deckId = "a12ccfc9-21da-4430-a37c-69416621dc09",
    userId = "janethuang@gmail.com",
  } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (
          cardId in jsonData.cards &&
          deckId in jsonData.decks &&
          userId in jsonData.users
        ) {
          // will need to make this group of operations atomic later
          // delete the card object
          delete jsonData.cards[cardId];
          // remove the cardId from the deck object
          jsonData.decks[deckId].cards = jsonData.decks[deckId].cards.filter(
            (card) => card != cardId
          );
          // remove the cardId from the user object
          jsonData.users[userId].cards = jsonData.users[userId].cards.filter(
            (card) => card != cardId
          );

          const jsonString = JSON.stringify(jsonData);
          fs.writeFile("database.json", jsonString)
            .then(() => res.json({ cardId }))
            .catch((err) => next(err));
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const getCard = (req, res, next) => {
  const { cardId } = req.params;
  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        //check if card exists
        if (cardId in jsonData.cards) {
          res.json(jsonData.cards[cardId]);
        } else {
          next({ message: "Cannot find card in database" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const updateCard = (req, res, next) => {
  const { cardId } = req.params;
  const { newCard } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // update card data
        if (cardId in jsonData.cards) {
          jsonData.cards[cardId] = newCard;

          const jsonString = JSON.stringify(jsonData);
          fs.writeFile("database.json", jsonString)
            .then(() => {
              res.json(jsonData.cards[cardId]);
            })
            .catch((err) => next(err));
        } else {
          next({ message: "Cannot find card in database" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports = { createCard, deleteCard, getCard, updateCard };
