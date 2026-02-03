const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected",  mongoose.connection.name);

     mongoose.connection.on("connected", () => {
      console.log("Connected to DB:", mongoose.connection.name);
    });
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
