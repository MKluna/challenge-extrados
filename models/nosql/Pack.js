const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const PackSchema = new mongoose.Schema(
  {
    dateOfPacking: { type: Date },
    idsCards: [{ type: String , lowercase: true}],
    idPackage: { type: String, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PackSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("packs", PackSchema);
