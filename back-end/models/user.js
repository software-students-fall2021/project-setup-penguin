const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("User", UserSchema);
