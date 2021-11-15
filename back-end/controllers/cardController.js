const Card = require("../models/card");
const Deck = require("../models/deck");
const User = require("../models/user");
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

const deleteCard = async (req, res, next) => {
  // current dummy default values since we're not calling the delete endpoint yet
  const { cardId } = req.params;
  const { deckId, userId } = req.body;

  const doesCardExist = await Card.exists({ _id: cardId });
  const doesDeckExist = await Deck.exists({ _id: deckId });
  const doesUserExist = await User.exists({ _id: userId });

  if (doesCardExist && doesDeckExist && doesUserExist) {
    const session = await db.startSession();
    await session.withTransaction(async () => {
      // delete card document
      await Card.deleteOne({ _id: cardId }).catch((err) => next(err));

      // delete cardId from deck object
      const deck = await Deck.findById(deckId);
      deck.cards = deck.cards.filter((currCardId) => currCardId != cardId);
      deck.save();

      // delete cardId from user object
      const user = await User.findById(userId);
      user.cards = user.cards.filter((currCardId) => currCardId != cardId);
      user.save();
    });

    res.send({ cardId });
  } else {
    throw "Error: nonexistent cardId or deckId or userId";
  }
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
