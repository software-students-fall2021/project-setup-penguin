const fs = require("mz/fs");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

// middleware
const morgan = require("morgan");
const cors = require("cors");
const { nextTick } = require("process");

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()); // prevents requests from being blocked by CORS

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// route for HTTP GET requests to root endpoint
app.get("/", (req, res) => {
  res.send("Hello!");
});

// POST endpoint for user creation
app.post("/user", (req, res, next) => {
  const {
    username,
    password,
    name,
  } = req.body;

  const userData = {
    username,
    password,
    name,
  }

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
})

// DELETE endpoint for user deletion
app.delete("/user/:userId", (req, res, next) => {
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
})

// GET endpoint used to get decks and cards belonging to an user
app.get("/user/:userId", (req, res, next) => {
  const userId = req.params.userId;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (!(userId in jsonData.users)) {
          throw "User does not exist";
        }

        const userData = {
          cards: [],
          decks: [],
        };

        jsonData.users[userId].cards.forEach((card) => {
          if (jsonData.cards[card] != null)
            userData.cards.push(jsonData.cards[card]);
        });

        jsonData.users[userId].decks.forEach((deck) => {
          if (jsonData.decks[deck] != null)
            userData.decks.push(jsonData.decks[deck]);
        });

        res.json({ userData });
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
});

// PATCH endpoint used to update user metadata
app.patch("/user/:userId", (req, res, next) => {
  const userId = req.params.userId;
  const { username, password, name } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        // update user document
        if (userId in jsonData.users) {
          if (username != userId) {
            delete Object.assign(jsonData.users, {[username]: jsonData.users[userId] })[userId];
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
});

/*****************************************/
/**************** DECKS ******************/
/*****************************************/

// GET endpoint used to get a deck from deckId
app.get("/deck/:deckId", (req, res, next) => {
  const deckId = req.params.deckId;

  fs.readFile('database.json')
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (!(deckId in jsonData.decks)){
          throw "Deck does not exit";
        }
        res.send(jsonData);
      } catch(err){
        next(err);
      }
    })
    .catch((err) => next(err));
});

// POST endpoint used to create a new deck
app.post("/deck", (req, res, next) => {
  // setting default userId until auth set up
  const {
    userId = "janethuang@gmail.com",
    deckName,
    deckDescription,
    cardTemplate,
  } = req.body;
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
          cardTemplate,
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
});

// PATCH endpoint to update deck metadata
app.patch("/deck/:deckId", (req, res, next) => {
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
});

// DELETE endpoint to delete a deck
app.delete("/deck/:deckId", (req, res) => {
  const {deckId} = req.params;
  const usersInDeck = [];

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);
        if ( deckId in jsonData.decks){
          let cardIDArray = jsonData.decks[deckId].cards;
          // delete deck
          delete jsonData.decks[deckId];

          // delete all cards from deck
          for (let i = 0; i < cardIDArray.length; i++){
            usersInDeck.push(jsonData.cards[cardIDArray[i]].userId);

            delete jsonData.cards[cardIDArray[i]];
          }

          // remove cardIDs from ALL users in deck
          for (let x = 0; x < usersInDeck.length; x++){
            let currCards = jsonData.users[usersInDeck[x]].cards;
            for (let j = 0; j < currCards.length; j++){
              if (cardIDArray.includes(currCards[j])){
                jsonData.users[usersInDeck[x]].cards.splice(j, 1);
              }
              else{
              }
            }
          }
        }
        const jsonString = JSON.stringify(jsonData);
        fs.writeFile("database.json", jsonString)
          .then(() => res.json({ deckId }))
          .catch((err) => console.log("!!", err));
      }
      catch (err) {
        next(err);
      }
  })
    .catch((err) => next(err));
});

/*****************************************/
/**************** CARDS ******************/
/*****************************************/

// POST endpoint used to create a new card
app.post("/card", (req, res, next) => {
  const { newCard, deckId, userId = "random@gmail.com" } = req.body;
  const cardId = uuidv4();

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (deckId && deckId in jsonData.decks) {
          jsonData.cards[cardId] = {
            cardId,
            deckId,
            userId,
            ...newCard,
          };
          jsonData.decks[deckId].cards.push(cardId);

          // add card reference to the user object
          if (userId && userId in jsonData.users) {
            // if the userId is populated, the userId must be valid
            // for guests, the card will not be mapped to a user
            jsonData.users[userId].cards.push(cardId);
          }

          const jsonString = JSON.stringify(jsonData);
          fs.writeFile("database.json", jsonString)
            .then(() => res.json({ cardId }))
            .catch((err) => next(err));
        } else {
          next({ message: "Cannot add card to nonexistent deck" });
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));
});

//  axios.delete('baseUrl/card', { data: {userId, deckId} })
// POST endpoint used to create a new card
app.delete("/card/:cardId", (req, res, next) => {
  // current dummy default values since we're not calling the delete endpoint yet
  const { cardId = "a3ac30da-4402-4359-9ffb-9ed5b8a27ba0" } = req.params;
  const {
    deckId = "a12ccfc9-21da-4430-a37c-69416621dc09",
    userId = "janethuang@gmail.com",
  } = req.body;

  fs.readFile("database.json")
    .then((data) => {
      try {
        const jsonData = JSON.parse(data);

        if (
          cardId in jsonData.cards &&
          deckId in jsonData.decks &&
          userId in jsonData.users
        ) {
          // will need to make this group of operations atomic later
          // delete the card object
          delete jsonData.cards[cardId];
          // remove the cardId from the deck object
          jsonData.decks[deckId].cards = jsonData.decks[deckId].cards.filter(
            (card) => card != cardId
          );
          // remove the cardId from the user object
          jsonData.users[userId].cards = jsonData.users[userId].cards.filter(
            (card) => card != cardId
          );

          const jsonString = JSON.stringify(jsonData);
          fs.writeFile("database.json", jsonString)
            .then(() => res.json({ cardId }))
            .catch((err) => next(err));
        }
      } catch (err) {
        next(err);
      }
    })
    .catch((err) => next(err));

  // remove cardId from cards array of deck with deckId
  console.log("deckId:", deckId);

  // remove cardID from cards array of user with userId
  console.log("userId:", userId);

  // delete Card document with cardId
  console.log("cardId:", cardId);

  res.json({
    cardId, // dummy cardId of deleted card
  });
});

//GET endpoint used to get a card from cardId
app.get("/card/:cardId", (req, res, next) => {
  const {cardId} = req.params;
  fs.readFile("database.json")
    .then((data) => {
      try{
          const jsonData = JSON.parse(data);

          //check if card exists
          if(cardId in jsonData.cards) {
            res.json(jsonData.cards[cardId]);
          } else {
            next({ message: "Cannot find card in database" });
          }
        } catch(err) {
          next(err);
        }
      })
      .catch((err) => next(err));
});


// error handling middleware
app.use((err, req, res, next) => {
  console.error("!!", err.message);
  res.status(500).send({ error: err });
});

module.exports = app;
