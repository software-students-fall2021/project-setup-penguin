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


  const fs = require('fs');

  fs.readFile('student.json', (err, data) => {
      if (err) throw err;
      let student = JSON.parse(data);
      console.log(student);
  });
  
  console.log('This is after the read call');

  // res.json(deckTemplate);
  // res.send(deckTemplate);
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

// POST endpoint used to create a new deck
app.post("/deck", (req, res) => {
  const { userId, deckName, deckDescription, cardTemplate } = req.body;

  // will need to write these values to the deck db later
  // post to json file
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
