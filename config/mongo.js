const mongoose = require("mongoose");
const NODE_ENV = process.env.NODE_ENV

const dbConnect = () => {
  const db_uri = (NODE_ENV === 'test') ? process.env.DB_URI_TEST : process.env.DB_URI;
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
