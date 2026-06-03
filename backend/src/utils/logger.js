"use strict";

/**
 * logger.js — structured logger with log-level control.
 * In production, writes to src/logs/. In development, pretty-prints to stdout.
 */

const path = require("path");
const fs   = require("fs");
const env  = require("../config/env");

const logsDir = path.resolve(__dirname, "../logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LEVELS[process.env.LOG_LEVEL] ?? (env.isProduction ? LEVELS.info : LEVELS.debug);

function write(level, ...args) {
  if (LEVELS[level] > currentLevel) return;
  const ts  = new Date().toISOString();
  const msg = args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ");
  const line = `[${ts}] [${level.toUpperCase()}] ${msg}`;

  // Always print to console
  (level === "error" || level === "warn" ? console.error : console.log)(line);

  // In production also append to file
  if (env.isProduction) {
    const file = path.join(logsDir, level === "error" ? "error.log" : "combined.log");
    fs.appendFile(file, line + "\n", () => {});
  }
}

const logger = {
  error: (...a) => write("error", ...a),
  warn:  (...a) => write("warn",  ...a),
  info:  (...a) => write("info",  ...a),
  debug: (...a) => write("debug", ...a),
  // Morgan-compatible stream
  stream: { write: (msg) => write("info", msg.trim()) },
};

module.exports = logger;
