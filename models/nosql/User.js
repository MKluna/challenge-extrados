const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: ["collectionist", "admin"],
    default: "collectionist",
  },
  deck: [{
    type: mongoose.Schema.ObjectId,
    ref: "cards",
    default: []
  }]
},
{
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model("users", UserSchema)

