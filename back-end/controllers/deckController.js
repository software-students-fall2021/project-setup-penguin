const fs = require("fs").promises;
const shortid = require("shortid");

const db = require("../db.js");
const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");

const getaccessCodes = async (req, res, next) => {
  const decks = await Deck.find({}).select("accessCode");
  console.log(decks);
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

const getDeck = (req, res, next) => {
  const deckId = req.params.deckId;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (deckId in jsonData.decks) {
          const cardObjs = jsonData.decks[deckId].cards.map(
            (cardId) => jsonData.cards[cardId]
          );
          res.json({ ...jsonData.decks[deckId], cards: cardObjs });
        } else {
          next({ message: "Cannot find deck in database" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const createDeck = async (req, res, next) => {
  const { userId, deckName, deckDescription, cardText } = req.body;
  const { filename } = req.file;

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
      filename,
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

const deleteDeck = (req, res, next) => {
  const { deckId } = req.params;
  const usersInDeck = [];

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);
        if (deckId in jsonData.decks) {
          let cardIDArray = jsonData.decks[deckId].cards;
          // delete deck
          delete jsonData.decks[deckId];

          // delete all cards from deck
          for (let i = 0; i < cardIDArray.length; i++) {
            usersInDeck.push(jsonData.cards[cardIDArray[i]].userId);

            delete jsonData.cards[cardIDArray[i]];
          }

          // remove cardIDs from ALL users in deck
          for (let x = 0; x < usersInDeck.length; x++) {
            let currCards = jsonData.users[usersInDeck[x]].cards;
            for (let j = 0; j < currCards.length; j++) {
              if (cardIDArray.includes(currCards[j])) {
                jsonData.users[usersInDeck[x]].cards.splice(j, 1);
              }
            }
          }

          const jsonString = JSON.stringify(jsonData);
          fs.writeFile("database.json", jsonString)
            .then(() => res.json({ deckId }))
            .catch((err) => next(err));
        } else {
          next({ message: "Cannot find deck in database" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getaccessCodes,
  getDeckTemplate,
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
};
