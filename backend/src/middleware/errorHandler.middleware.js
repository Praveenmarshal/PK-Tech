"use strict";

const env    = require("../config/env");
const logger = require("../utils/logger");

function errorHandler(error, req, res, _next) {
  logger.error(`${req.method} ${req.path} — ${error.message}`);
  const status = error.statusCode || error.status || 500;
  res.status(status).json({
    message: error.message || "Internal server error",
    ...(env.isDevelopment ? { stack: error.stack } : {}),
  });
}

module.exports = errorHandler;
