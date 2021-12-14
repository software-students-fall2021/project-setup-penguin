const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  deckId: { type: Schema.Types.ObjectId, ref: "Deck", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  city: { type: String },
  tagline: { type: String },
  summary: { type: String },
  sectionContent0: { type: String },
  sectionContent1: { type: String },
  sectionContent2: { type: String },
  sliderValue: { type: Number },
  filename: { type: String },
});

module.exports = mongoose.model("Card", CardSchema);
