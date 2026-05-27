function errorHandler(error, req, res, next) {
  console.error(error);
  const status = error.statusCode || 500;
  res.status(status).json({
    message: error.message || "ZILIST API error",
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {})
  });
}

module.exports = errorHandler;

