const mongoose = require("mongoose");

const pcuri = "mongodb://127.0.0.1:27017/Eommerce_DB";
const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      pcuri,
      {
        useNewUrlParser: true,
      }
    );
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Error in Connecting to the DB");
  }
};

module.exports = { connectDb };
