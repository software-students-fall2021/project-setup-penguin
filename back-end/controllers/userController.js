const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const db = require("../db.js");

const User = require("../models/user");
const Card = require("../models/card");
const Deck = require("../models/deck");

const { jwtOptions } = require("../jwt-config");

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(401).json({ success: false, message: `email already taken` });
  }

  const hash = await bcrypt.hash(password, 10).catch((err) => {
    next(err);
  });
  const user = await new User({
    name: name,
    email: email,
    password: hash,
    cards: [],
  })
    .save()
    .catch((err) => {
      next(err);
    });

  const payload = { id: user._id };
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  res.json({ success: true, email: user.email, token: token });
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
  const userId = req.user._id;

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

const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { email, password, name } = req.body;

  // check if User already exists
  User.countDocuments({ _id: userId }, function (err, count) {
    if (count == 0) {
      throw "User does not exist";
    }
  });

  await User.findOneAndUpdate({ _id: userId }, { name, email, password }).catch(
    (err) => {
      next(err);
    }
  );
  res.json({ userId });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(401)
      .json({ success: false, message: `no email or password provided` });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: `user not found: ${email}.` });
  }
  const match = await bcrypt.compare(password, user.password).catch((err) => {
    next(err);
  });

  if (match) {
    const payload = { id: user._id };
    const token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ success: true, email: user.email, token: token });
  } else {
    res
      .status(401)
      .json({ success: false, message: `passwords did not match` });
  }
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
};
