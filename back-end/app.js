const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const cardRouter = require("./routes/cardRoutes");
const deckRouter = require("./routes/deckRoutes");

const app = express();
require("./db.js");

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")); // morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()); // prevents requests from being blocked by CORS
app.use(express.static("uploads"));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use("/card", cardRouter);
app.use("/user", userRouter);
app.use("/deck", deckRouter);

// error handling middleware
app.use((err, req, res, next) => {
  console.error("!!", err.message);
  res.status(500).send({ error: err });
});

module.exports = app;
