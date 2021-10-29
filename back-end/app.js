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

  // will need to add the cardData to the user later
  const cardData = {
    userId,
    ...cardTemplate,
  };
  console.log("cardData:", cardData);

  res.json({
    deckId: 1, // dummy deckId
  });
});

module.exports = app;
