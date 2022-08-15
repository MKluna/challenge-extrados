const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const CardsSchema = new mongoose.Schema(
  {
    idCard: {
      type: String,
      unique: true,
      required: true
    },
    playerName: {
      type: String,
      lowercase: true
    },
    playerLastName: {
      type: String,
      lowercase: true
    },
    playerRole: {
      type: String,
    },
    teamName: {
      type: String,
      lowercase: true
    },
    rarity: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CardsSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("cards", CardsSchema);