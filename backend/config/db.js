const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    return true;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    return false;
  }
};
module.exports = connectDB;
