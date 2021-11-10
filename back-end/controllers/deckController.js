const Deck = require("../models/deck");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const getDeckIds = (req, res, next) => {
  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);
        res.json({ deckIds: Object.keys(jsonData.decks) });
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
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

const createDeck = (req, res, next) => {
  // setting default userId until auth set up
  const { userId, deckName, deckDescription, cardTemplate } = req.body;
  const deckId = uuidv4();
  const cardId = uuidv4();

  const cardData = {
    cardId,
    deckId,
    userId,
    ...cardTemplate,
  };

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // save card to cards collection
        jsonData.cards[cardId] = cardData;

        // save deck to decks collection
        jsonData.decks[deckId] = {
          deckId,
          ownerId: userId,
          deckName,
          deckDescription,
          cardTemplate: { ...cardTemplate, image: null },
          cards: [cardId],
        };

        // update user document
        if (userId && userId in jsonData.users) {
          jsonData.users[userId].cards.push(cardId);
        }

        const jsonString = JSON.stringify(jsonData);
        fs.writeFile("database.json", jsonString)
          .then(() => res.json({ deckId }))
          .catch((err) => next(err));
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const updateDeck = (req, res, next) => {
  const deckId = req.params.deckId;
  const { deckName, deckDescription } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // update deck document
        if (deckId in jsonData.decks) {
          jsonData.decks[deckId].deckName = deckName;
          jsonData.decks[deckId].deckDescription = deckDescription;

          const jsonString = JSON.stringify(jsonData);
          fs.writeFile("database.json", jsonString)
            .then(() => {
              res.json(jsonData.decks[deckId]);
            })
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
  getDeckIds,
  getDeckTemplate,
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
};
