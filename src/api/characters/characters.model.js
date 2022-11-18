const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    race: { type: String, enum: ["human", "saiyan", "android", "namekian", "unknown"], required: true, default: "unknown" },
    img: {type: String, required: true, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Dragonball_%284-Star%29.svg/200px-Dragonball_%284-Star%29.svg.png"},
    universe: { type: Number, min: 0, max: 12 },
    transform: { type: Boolean, default: false },
    genre: { type: String, enum: ["male", "female", "namekian", "angel", "genderless"], default: "genderless" },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model('characters', characterSchema);

module.exports = Character;