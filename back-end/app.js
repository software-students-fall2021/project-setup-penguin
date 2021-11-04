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

// VARIABLES ***
const deckTemplate = {
  "template":{
     "tagline":"Tasmanian devil",
     "name":"Bontebok",
     "city":"Elephant, asian",
     "summary":"Macaw, blue and gold",
     "sectionLabel0":"Vervet monkey",
     "sectionLabel1":"Caracara (unidentified)",
     "sectionLabel2":"Lemur, brown",
     "sectionContent0":"Civet, common palm",
     "sectionContent1":"Capybara",
     "sectionContent2":"Cormorant, pied",
     "sliderLabelMin":"neural-net",
     "sliderLabelMax":"array",
     "sliderValue":41
  },
  "cards":[
     {
        "tagline":"string",
        "name":"string",
        "city":"string",
        "summary":"string",
        "sectionLabel0":"string",
        "sectionLabel1":"string",
        "sectionLabel2":"string",
        "sectionContent0":"string",
        "sectionContent1":"string",
        "sectionContent2":"string",
        "sliderLabelMin":"string",
        "sliderLabelMax":"string",
        "sliderValue": Number,
     }
  ],
  "deckOwnerId":"string",
  "deckName":"string",
  "deckDescription":"string"
};

// ROUTING ***
// route for HTTP GET requests to root endpoint
app.get("/", (req, res) => {
  res.send("Hello!");
});

// GET endpoint used to get a deck from deckId
// get from json file
app.get("/deck/:deckId", (req, res) => {
  const deckId = req.params.deckId;

  console.log("hello", req.body);
  // const { cards, deckOwnerId, deckName, deckDescription } = req.body;
  console.log("deckId:", deckId);

  fs.readFile('database.json', (err, data) => {
      if (err) throw err;
      let student = JSON.parse(data);
      console.log(student);
      res.send(student);
  })
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

      // save card to cards collection
      jsonData.cards[cardId] = {
        id: cardId,
        ...cardData,
      };

      // save deck to decks collection
      jsonData.decks[deckId] = {
        id: deckId,
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
  
  console.log('This is after the read call');

  // res.json(deckTemplate);
  // res.send(deckTemplate);
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

      // update deck document
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
  const { newCard, deckId } = req.body;
  const userId = "random@gmail.com";
  const cardId = uuidv4();

  fs.readFile("database.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(jsonString);

      // add card to the cards collection
      jsonData.cards[cardId] = {
        cardId,
        deckId,
        userId,
        ...newCard,
      };

      // add card reference to the deck object
      if (deckId && deckId in jsonData.decks) {
        jsonData.decks[deckId].cards.push(cardId);
      }

      // add card reference to the user object
      if (userId && userId in jsonData.users) {
        // if the userId is populated, the userId must be valid
        // for guests, the card will not be mapped to a user
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
    cardId: cardId,
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
