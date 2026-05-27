const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<username>")) {
    console.warn("MongoDB is not configured. Set MONGODB_URI in backend/.env for dynamic data.");
    return null;
  }

  const connection = await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || "zilist"
  });
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}

module.exports = connectDB;

