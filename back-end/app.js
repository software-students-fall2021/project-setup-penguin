const fs = require("fs");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

// middleware
const morgan = require("morgan");
const cors = require("cors");

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

// POST endpoint used to create a new deck
app.post("/deck", (req, res) => {
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
    userId,
    ...cardTemplate,
  };

  fs.readFile("database.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(jsonString);

      jsonData.cards[cardId] = {
        id: cardId,
        ...cardData,
      };

      jsonData.decks[deckId] = {
        id: deckId,
        ownerId: userId,
        deckName,
        deckDescription,
        cardTemplate,
        cards: [cardId],
      };

      if (userId && userId in jsonData.users) {
        jsonData.users[userId].cards.push(cardId);
      }

      const newJsonString = JSON.stringify(jsonData);
      fs.writeFile("database.json", newJsonString, (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

  res.json({
    deckId, // dummy deckId
  });
});

// PATCH endpoint to update deck metadata
app.patch("/deck/:deckId", (req, res) => {
  const deckId = req.params.deckId;
  const { deckName, deckDescription } = req.body;

  fs.readFile("database.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(jsonString);

      if (deckId in jsonData.decks) {
        jsonData.decks[deckId].deckName = deckName;
        jsonData.decks[deckId].deckDescription = deckDescription;
      } else {
        console.log("Cannot find deck in database");
      }

      const newJsonString = JSON.stringify(jsonData);
      fs.writeFile("database.json", newJsonString, (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

  res.status(200).send();
});

// POST endpoint used to create a new card
app.post("/card", (req, res) => {
  const { userId, newCard, deckId } = req.body;

  // create a new Card instance from newCard and save
  console.log("newCard:", newCard);

  // add new card's id to cards array of deck with deckId
  console.log("deckId:", deckId);

  // add new card's id to cards array of user with userId
  console.log("userId:", userId);

  res.json({
    cardId: 1, // dummy cardId
  });
});

//  axios.delete('baseUrl/card', { data: {userId, deckId} })
// POST endpoint used to create a new card
app.delete("/card/:cardId", (req, res) => {
  const { cardId } = req.params;
  const { deckId, userId } = req.body;

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

module.exports = app;
