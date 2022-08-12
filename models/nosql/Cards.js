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
    },
    playerLastName: {
      type: String,
    },
    playerRole: {
      type: String,
    },
    teamName: {
      type: String,
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