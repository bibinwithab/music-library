const mongoose = require("mongoose");

const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

module.exports = dbConfig;
