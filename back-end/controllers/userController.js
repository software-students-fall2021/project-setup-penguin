const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const db = require('../db.js');

const User = require('../models/user');
const Card = require('../models/card');
const Deck = require('../models/deck');
const saltRounds = 10;

const { jwtOptions } = require('../jwt-config');

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(401).json({ success: false, message: 'email already taken' });
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

const deleteUser = async (req, res, next) => {
  const userId = req.user._id;
  const userData = await User.findOne({ _id: userId });
  const userCardIds = userData.cards;

  //remove all cards from decks
  userCardIds.forEach(async (cardId) => {
    // delete card document
    await Card.deleteOne({ _id: cardId }).catch((err) => next(err));

    // delete cardId from deck object
    const deck = await Deck.findById(deckId);
    deck.cards = deck.cards.filter((currCardId) => currCardId != cardId);
    deck.save();
  });

  //make all decks ownerless
  const decks = await Deck.updateMany(
    { ownerId: userId },
    { $set: { ownerId: 'ownerless' } }
  );

  //Delete user
  try {
    User.deleteOne({ _id: userId }).then(() => {
      res.status(200);
      res.json({ message: 'User successfully deleted' });
    });
  } catch (e) {
    console.log(e);
  }
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
      const deckData = await Deck.findOne({
        _id: userCard.deckId.toString(),
      });

      return {
        isOwned: deckData.ownerId.equals(userId),
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

const getUserAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userData = await User.findOne({ _id: userId });

    console.log(userData);
    res.status(200);
    res.json({ name: userData.name, email: userData.email });
  } catch (error) {
    res.status(200);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;
  const { email, password, name } = req.body;

  //check if User does not exists
  const count = await User.countDocuments({ _id: userId });
  if (count === 0) {
    throw 'User does not exist';
  }

  //find relevant info - don't allow updates if conflicting email present
  const prevInfo = await User.find({ _id: userId }).select({
    _id: 0,
    email: 1,
  });

  if (!email || !password || !name) throw 'Empty field';

  if (prevInfo[0].email !== email) {
    const conflict = await User.countDocuments({ email: email });
    console.log(conflict);
    if (conflict >= 1) {
      throw 'User email conflict';
    }
  }

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    await User.findOneAndUpdate({ _id: userId }, { name, email, hash })
      .exec()
      .catch((err) => {
        next(err);
      });
  });
  res.json({ userId });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(401)
      .json({ success: false, message: 'no email or password provided' });
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
      .json({ success: false, message: 'passwords did not match' });
  }
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserAccount,
};
