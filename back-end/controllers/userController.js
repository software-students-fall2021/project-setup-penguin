const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");
const fs = require("fs").promises;
const db = require("../db.js");
const e = require("cors");

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  const session = await db.startSession();
  await session.withTransaction(async () => {
    // check if User already exists
    User.countDocuments({ email: email }, function (err, count) {
      if (count > 0) {
        throw "User already exists";
      }
    });
    
    // create & save new User document
    const user = await new User({
      name: name,
      email: email,
      password: password,
      cards: []
    })
      .save()
      .catch((err) => {
        next(err);
      });
  });

  session.endSession();
  res.json({ email });
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

const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { email, password, name } = req.body;

  // check if User already exists
  User.countDocuments({ _id: userId }, function (err, count) {
    if (count == 0) {
      throw "User does not exist";
    }
  });

  await User.findOneAndUpdate(
    { _id: userId },
    { name, email, password }
  ).catch((err) => {
    next(err);
  });
  res.json({ userId });
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
