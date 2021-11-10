const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cardTemplate: {
    name: { type: String, required: true },
    city: { type: String, required: true },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    sectionContent0: { type: String, required: true },
    sectionContent1: { type: String, required: true },
    sectionContent2: { type: String, required: true },
    sectionLabel0: { type: String, required: true },
    sectionLabel1: { type: String, required: true },
    sectionLabel2: { type: String, required: true },
    sliderLabelMin: { type: String, required: true },
    sliderLabelMax: { type: String, required: true },
    sliderValue: { type: Number, required: true },
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("Deck", DeckSchema);
