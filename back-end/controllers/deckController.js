const fs = require("fs").promises;
const shortid = require("shortid");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require("../db.js");
const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");

const getAccessCodes = async (req, res, next) => {
  const decks = await Deck.find({})
    .select("accessCode")
    .catch((err) => {
      next(err);
    });
  res.json(decks);
};

// get cardTemplate from deck
const getDeckTemplate = async (req, res, next) => {
  const deck = await Deck.findOne({ _id: req.params.deckId })
    .select("cardTemplate")
    .catch((err) => {
      next(err);
    });
  res.json(deck);
};

// get deckName and deckDescription from deck
const getDeckDetails = async (req, res, next) => {
  const deck = await Deck.findOne({ _id: req.params.deckId })
    .select("deckName deckDescription")
    .catch((err) => {
      next(err);
    });
  res.json(deck);
};

const getDeck = async (req, res, next) => {
  const deckId = req.params.deckId;
  // Deck object to return and send (modified with populated cardObj)
  let deckObj = {};
  // Temporary array to hold the card objects (and later push into deckObj)
  let cardsObj = [];

  // Find deck by deckId
  await Deck.find({ _id: deckId }
    ).then((result) => {
      deckObj = result[0];
      cardsObj = result[0].cards;

      // Find cards based off of cardIds in cardsObj
      Card.find({ _id:{$in: cardsObj }})
        .then(result => {
          // Fill deckObj with the card documents found by the cardIds in cardsObj
          deckObj.cards = result;
          // Send final deckObj
          res.send(deckObj);
        })
    })
    .catch((err) => {
      next(err);
    });
};

const createDeck = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token, deckName, deckDescription, cardText } = req.body;

  const cardTemplate = JSON.parse(cardText);
  const accessCode = shortid.generate();
  let deckId;
  let userId;

  if (token) {
    userId = jwt.decode(token).id;
  }

  const session = await db.startSession();
  await session.withTransaction(async () => {
    // create & save new Deck document
    const deck = await new Deck({
      accessCode,
      ownerId: userId,
      deckName,
      deckDescription,
      cardTemplate,
      cards: [],
    })
      .save()
      .catch((err) => {
        next(err);
      });
    deckId = deck._id;

    // create & save new Card document
    const card = await new Card({
      userId,
      deckId,
      filename: req.file?.filename,
      ...cardTemplate,
    })
      .save()
      .catch((err) => {
        next(err);
      });

    // update Deck document w/ id of newly added Card
    await Deck.findOneAndUpdate({ _id: deckId }, { cards: [card._id] }).catch(
      (err) => {
        next(err);
      }
    );

    // update User document w/ id of newly added Card
    if (userId) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { cards: card._id } }
      );
    }
  });

  session.endSession();
  res.json({ deckId });
};

const updateDeck = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const deckId = req.params.deckId;
  const { deckName, deckDescription } = req.body;

  await Deck.findOneAndUpdate(
    { _id: deckId },
    { deckName, deckDescription }
  ).catch((err) => {
    next(err);
  });

  res.json({ deckId });
};

const deleteDeck = async (req, res, next) => {
  const { deckId } = req.params;
  let cardIds = [];

  const doesDeckExist = await Deck.exists({ _id: deckId });

  if (doesDeckExist){
  // Find deck to delete by deckId
  await Deck.find({ _id: deckId }
    ).then((result) => {
      cardIds = result[0].cards;

      // Delete deck
      Deck.deleteOne({ _id: deckId }
        ).catch((err) => {
          next(err);
        })
      // Delete cards that were in the deck
      Card.remove({ _id: { $in: cardIds} }
        ).catch((err) => {
          next(err);
        })
      res.send({ deckId })
    }).catch((err) => {
      next(err);
    });
  }
};

module.exports = {
  getDeckDetails,
  getAccessCodes,
  getDeckTemplate,
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
};
