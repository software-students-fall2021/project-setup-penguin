const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const Card = require("../models/card");
const Deck = require("../models/deck");
const User = require("../models/user");
const db = require("../db.js");

const getCardPermissions = async (req, res, next) => {
  const { cardId } = req.params;

  const doesCardExist = await Card.exists({ _id: cardId });

  if (doesCardExist) {
    const card = await Card.findById(cardId);

    if (req.user._id.equals(card.userId)) {
      res.json({ canEditDeleteCard: true });
    } else {
      res.json({ canEditDeleteCard: false });
    }
  } else {
    next({ message: "Error: cardId does not exist" });
  }
};

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return res.status(400).json({ messages });
  }

  const { deckId, token, cardText, name } = req.body;

  try {
    const newCard = JSON.parse(cardText);
    let cardId;
    let userId;

    if (token) {
      userId = jwt.decode(token).id;
    }

    const session = await db.startSession();
    await session.withTransaction(async () => {
      // create & save new Card document
      const card = await new Card({
        deckId,
        userId,
        name,
        ...newCard,
        filename: req.file?.filename,
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
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const cardId = mongoose.Types.ObjectId(req.params.cardId);
  const { deckId } = req.body;
  const userId = req.user._id;
  let filename;

  const doesCardExist = await Card.exists({ _id: cardId });
  const doesDeckExist = await Deck.exists({ _id: deckId });
  const doesUserExist = await User.exists({ _id: userId });

  if (doesCardExist && doesDeckExist && doesUserExist) {
    const card = await Card.findById(cardId, "filename").catch((err) =>
      next(err)
    );
    filename = card?.filename;

    const session = await db.startSession();
    await session.withTransaction(async () => {
      // delete card document\
      await Card.deleteOne({ _id: cardId }).catch((err) => next(err));

      // delete cardId from deck object
      const deck = await Deck.findById(deckId);
      deck.cards = deck.cards.filter(
        (currCardId) => !currCardId.equals(cardId)
      );
      deck.save();

      // delete cardId from user object
      const user = await User.findById(userId);
      user.cards = user.cards.filter(
        (currCardId) => !currCardId.equals(cardId)
      );
      user.save();
    });

    // delete photo associated w/ card
    if (filename) {
      fs.unlink(
        path.join(__dirname, `../public/uploads/${filename}`),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("removed", filename);
        }
      );
    }

    res.send({ cardId });
  } else {
    next({ message: "Error: nonexistent cardId or deckId or userId" });
  }
};

const getCard = async (req, res, next) => {
  const { cardId } = req.params;
  const doesCardExist = await Card.exists({ _id: cardId });

  if (doesCardExist) {
    const card = await Card.findById(cardId).catch((err) => {
      next(err);
    });
    res.send({ card });
  } else {
    next({ message: "Error: cardId does not exist" });
  }
};

const updateCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { cardText } = req.body;

  const newCard = JSON.parse(cardText);
  const originalFile = newCard.filename;

  // if new photo uploaded, delete original file
  if (req.file?.filename) {
    newCard["filename"] = req.file.filename;

    if (originalFile) {
      fs.unlink(
        path.join(__dirname, `../public/uploads/${originalFile}`),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("removed", originalFile);
        }
      );
    }
  }

  await Card.findOneAndUpdate(
    { _id: cardId, userId: req.user._id },
    newCard
  ).catch((err) => {
    next(err);
  });

  res.json({ cardId });
};

module.exports = {
  getCardPermissions,
  createCard,
  deleteCard,
  getCard,
  updateCard,
};
