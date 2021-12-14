const mongose = require("mongoose");
const ObjectId = mongose.Types.ObjectId;
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const db = require("../db.js");
const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");

const getDeckIdFromAccessCode = async (req, res, next) => {
  const accessCode = req.params.accessCode;
  const deck = await Deck.findOne({ accessCode }).catch((err) => {
    next(err);
  });
  res.json(deck);
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

const getDeckPermissions = async (req, res, next) => {
  const deck = await Deck.findById(req.params.deckId).catch((err) => {
    next(err);
  });
  const isDeckOwner = req.user._id.equals(deck.ownerId);

  const cardIds = deck.cards;
  const card = await Card.findOne({
    _id: { $in: cardIds },
    userId: req.user._id,
  }).catch((err) => {
    next(err);
  });
  const canAddCard = card === null;

  res.json({ isDeckOwner, canAddCard });
};

const getDeck = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return res.status(400).json({ messages });
  }

  const deckId = req.params.deckId;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filter = req.query.filter;
  const skipValues = page * limit;

  try {
    const pageCards = await Deck.findById(deckId)
      .populate({
        path: "cards",
        match: { name: { $regex: `(?i)^${filter}` } },
        options: {
          limit: limit,
          sort: { name: 1 },
          skip: skipValues,
        },
      })
      .catch((err) => {
        next(err);
      });

    res.send({
      hasNextPage: !(pageCards.cards.length < limit),
      deckData: pageCards,
    });
  } catch (err) {
    next(err);
  }
};

const createDeck = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return res.status(400).json({ messages });
  }

  const { token, deckName, deckDescription, cardText } = req.body;

  try {
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
        ).catch((err) => {
          next(err);
        });
      }
    });

    session.endSession();
    res.json({ deckId });
  } catch (err) {
    next(err);
  }
};

const updateDeck = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return res.status(400).json({ messages });
  }

  const deckId = req.params.deckId;
  const { deckName, deckDescription } = req.body;

  const updatedDeck = await Deck.findOneAndUpdate(
    { _id: deckId },
    { deckName, deckDescription },
    { new: true }
  ).catch((err) => {
    next(err);
  });

  if (updatedDeck) {
    res.json(updatedDeck);
  } else {
    next({ message: "Error: attempted to add card to nonexistent deck" });
  }
};

const deleteDeck = async (req, res, next) => {
  const { deckId } = req.params;

  const doesDeckExist = await Deck.exists({ _id: deckId }).catch((err) => {
    next(err);
  });

  if (doesDeckExist) {
    const session = await db.startSession();
    await session.withTransaction(async () => {
      // get card ids from deck
      const deck = await Deck.findById(deckId)
        .select("cards")
        .catch((err) => next(err));
      const cardIds = deck.cards;

      // get ids of card owners
      const cards = await Card.find({
        _id: {
          $in: cardIds,
        },
      })
        .select("userId")
        .catch((err) => next(err));
      const userToCardIdMappings = cards.reduce((prev, card) => {
        if (card.userId) {
          return { ...prev, [card.userId]: card._id };
        } else {
          return prev;
        }
      }, {});

      // remove cards from each user's cards array
      for (const userId of Object.keys(userToCardIdMappings)) {
        const user = await User.findById(userId);
        user.cards = user.cards.filter(
          (currCardId) => !currCardId.equals(userToCardIdMappings[userId])
        );
        user.save();
      }

      // delete card documents
      await Card.remove({ _id: { $in: cardIds } }).catch((err) => {
        next(err);
      });

      // delete deck document
      await Deck.deleteOne({ _id: deckId }).catch((err) => {
        next(err);
      });
    });

    res.json({ deckId });
  } else {
    next({ message: "Error: attempted to add delete nonexistent deck" });
  }
};

module.exports = {
  getDeckDetails,
  getDeckIdFromAccessCode,
  getDeckTemplate,
  getDeckPermissions,
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
};
