"use strict";

// env.js MUST be loaded first — it calls dotenv.config() and validates vars
const env           = require("./config/env");
const app           = require("./app");
const connectDB     = require("./config/db");
const { connectRedis } = require("./config/redis");
const { seedAdmin } = require("./utils/seedAdmin");
const logger        = require("./utils/logger");

async function start() {
  try {
    await connectDB();
    await connectRedis();
    await seedAdmin().catch((err) =>
      logger.warn(`Startup seeding skipped: ${err.message}`)
    );
  } catch (err) {
    logger.error(`Startup error: ${err.message}`);
  }

  app.listen(env.PORT, () => {
    logger.info(`PK Tech server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
  });
}

start();
