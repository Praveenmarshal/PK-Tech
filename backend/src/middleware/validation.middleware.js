"use strict";

/**
 * validation.middleware.js
 * Runs a validator function against req.body and short-circuits with 400
 * if validation fails.
 *
 * Validators live in src/validators/ and export a validate(body) function
 * that returns { valid: boolean, errors: string[] }.
 */

function validate(validatorFn) {
  return (req, res, next) => {
    const result = validatorFn(req.body);
    if (!result.valid) {
      return res.status(400).json({ message: "Validation failed", errors: result.errors });
    }
    next();
  };
}

module.exports = { validate };
