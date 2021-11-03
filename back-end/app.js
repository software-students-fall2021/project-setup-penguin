const express = require("express");
const app = express();

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
  const { userId, deckName, deckDescription, cardTemplate } = req.body;

  // will need to write these values to the deck db later
  console.log("userId:", userId);
  console.log("deckName:", deckName);
  console.log("deckDescription:", deckDescription);
  console.log("cardTemplate:", cardTemplate);

  // will need to create a user card from the template card
  const cardData = {
    userId,
    ...cardTemplate,
  };
  console.log("cardData:", cardData);

  res.json({
    deckId: 1, // dummy deckId
  });
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

// PATCH endpoint to update deck metadata
app.patch("/deck/:deckId", (req, res) => {
  const deckId = req.params.deckId;
  const { deckName, deckDescription } = req.body;

  console.log("deckId:", deckId);
  console.log("deckName:", deckName);
  console.log("deckDescription:", deckDescription);

  const updatedDeckMetadata = {
    deckName,
    deckDescription,
  };

  // will need to write the update to deck with deckId in database later
  console.log("updatedDeckMetadata:", updatedDeckMetadata);

  res.status(200).send();
});

module.exports = app;
