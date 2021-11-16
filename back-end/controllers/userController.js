const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");
const fs = require("fs").promises;
const db = require("../db.js");

const createUser = (req, res, next) => {
  const { username, password, name } = req.body;

  const userData = {
    username,
    password,
    name,
    card: [],
    deck: [],
  };

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // update user document
        if (username in jsonData.users) {
          throw "User already exists";
        }

        // save username
        jsonData.users[username] = userData;

        const jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFile("database.json", jsonString)
          .then(() => res.json({ username, name }))
          .catch((err) => next(err));
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // update user document
        if (!(userId in jsonData.users)) {
          throw "User does not exist";
        }

        // delete cards associated with user
        jsonData.users[userId].cards.forEach((card) => {
          if (card && card in jsonData.cards) {
            const deck = jsonData.cards[card].deckId;
            const deckArr = jsonData.decks[deck].cards;
            for (let i = 0; i < deckArr.length; i++) {
              if (deckArr[i] === card) {
                deckArr.splice(i, 1);
                break;
              }
            }
            delete jsonData.cards[card];
          }
        });

        // delete user
        delete jsonData.users[userId];

        const jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFile("database.json", jsonString)
          .then(() => res.json({ userId }))
          .catch((err) => next(err));
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const getUser = async (req, res, next) => {
  const userId = req.params.userId;

  // query DB for user data and extract array of cardIds
  const userData = await User.findOne({ _id: userId });
  const userCardIds = userData.cards;

  // query DB and replace cardIds with card objects
  const userCards = await Promise.all(
    userCardIds.map(
      async (cardId) => await Card.findOne({ _id: cardId.toString() })
    )
  );

  // query DB for whether user owns the deck
  const userCardsWithDeckData = await Promise.all(
    userCards.map(async (userCard) => {
      console.log("userCard:", typeof userCard);
      const deckData = await Deck.findOne({
        _id: userCard.deckId.toString(),
      });

      return {
        isOwned: deckData.ownerId === userId,
        deckName: deckData.deckName,
        cardTemplate: deckData.cardTemplate,
        cardData: {
          ...userCard.toObject(),
          _id: userCard._id.toString(),
          deckId: userCard.deckId.toString(),
        },
      };
    })
  );

  res.send(userCardsWithDeckData);
};

const updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const { username, password, name } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // update user document
        if (userId in jsonData.users) {
          if (username != userId) {
            delete Object.assign(jsonData.users, {
              [username]: jsonData.users[userId],
            })[userId];
          }

          jsonData.users[username].email = username;
          jsonData.users[username].password = password;
          jsonData.users[username].name = name;

          const jsonString = JSON.stringify(jsonData, null, 2);
          fs.writeFile("database.json", jsonString)
            .then(() => {
              console.log(jsonData.users[username]);
              res.json(jsonData.users[username]);
            })
            .catch((err) => next(err));
        } else {
          next({ message: "Cannot find user in database" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

const loginUser = (req, res, next) => {
  const { userId, password } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (
          userId in jsonData.users &&
          jsonData.users[userId].password === password
        ) {
          res.json({ userId });
        } else {
          throw "Invalid Login";
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
};
