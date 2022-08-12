const mongoose = require("mongoose");

const dbConnect = () => {
  const db_uri = process.env.DB_URI;
  mongoose.connect(
    db_uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        console.log("The database is successfully connected");
      } else {
        console.log("Error connecting the database");
      }
    }
  );
};

module.exports = dbConnect;
