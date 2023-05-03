const mongoose = require("mongoose");
 
const url = process.env.MONGO_URI;
console.log("i am " , url);
const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      url
    );
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Error in Connecting to the DB");
  }
};

module.exports = { connectDb };
