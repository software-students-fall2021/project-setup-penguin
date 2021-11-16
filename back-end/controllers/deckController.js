const fs = require("fs").promises;
const shortid = require("shortid");
const { validationResult } = require("express-validator");

const db = require("../db.js");
const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");

const getaccessCodes = async (req, res, next) => {
  const decks = await Deck.find({}).select("accessCode");
  // console.log(decks);
  res.json(decks);
};

const getDeckTemplate = (req, res, next) => {
  const deckId = req.params.deckId;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (deckId in jsonData.decks) {
          res.json(jsonData.decks[deckId].cardTemplate);
        } else {
          next({ message: "Cannot find deck in database" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
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

  const { userId, deckName, deckDescription, cardText } = req.body;

  const cardTemplate = JSON.parse(cardText);
  const accessCode = shortid.generate();
  let deckId;

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

  await Deck.find({ _id: deckId }
    ).then((result) => {
      cardIds = result.cards;
      console.log("cardIds", cardIds);

      Deck.deleteOne({ _id: deckId }
        ).catch((err) => {
          next(err);
        })
      Card.deleteMany({ _id: cardIds }
        ).catch((err) => {
          next(err);
        })
    }).catch((err) => {
      next(err);
    });
};

module.exports = {
  getaccessCodes,
  getDeckTemplate,
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
};
