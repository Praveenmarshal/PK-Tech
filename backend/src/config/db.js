"use strict";

const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

async function connectDB() {
  if (!env.isMongoConfigured) {
    logger.warn("MongoDB is not configured. Set MONGODB_URI in backend/.env for dynamic data.");
    return null;
  }

  const connection = await mongoose.connect(env.MONGODB_URI, {
    dbName: env.MONGODB_DB,
  });

  logger.info(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}

module.exports = connectDB;
