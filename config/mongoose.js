const mongoose = require("mongoose");
 

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://asifMalik:lEWvxkc6TOdg6c2Z@mydb.ijjdxjc.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Error in Connecting to the DB" , error);
  }
};

module.exports = { connectDb };
