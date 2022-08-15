const dbConnect = require("../config/mongo");
require("dotenv").config();
const mongoose = require("mongoose");
const { userModel } = require("../models");
const { encrypt } = require("./passwordManagement");

(async function () {
  dbConnect();
  const admins = [
    {
      username: "uniqueadmin",
      email: "admin@admin.com",
      password: await encrypt("123456"),
      role: ["admin"],
    },
  ];
  try {
    await userModel.insertMany(admins);
    console.log("Administrators successfully created");
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
})();
