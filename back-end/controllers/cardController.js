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

const getCard = async (req, res, next) => {
  const { cardId } = req.params;

  const doesCardExist = await Card.exists({ _id: cardId });

  if (doesCardExist) {
    const card = await Card.findById(cardId);
    res.send({ card });
  } else {
    throw "Error: cardId does not exist";
  }
};

const updateCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { newCard } = req.body;

  await Card.findOneAndUpdate(
    { _id: cardId },
    newCard
  ).catch((err) => {
    next(err);
  });
  
  res.json({ cardId });
};

module.exports = { createCard, deleteCard, getCard, updateCard };
