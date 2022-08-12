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
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: "collectionist"
    },
  ],
},
{
    timestamps: true,
    versionKey: false
}
);

module.exports = mongoose.model("users", UserSchema)

