"use strict";

/**
 * encrypt.js — AES-256-GCM symmetric encryption helpers.
 *
 * Usage:
 *   const { encrypt, decrypt } = require("../utils/encrypt");
 *   const cipher = encrypt("my secret value");
 *   const plain  = decrypt(cipher);
 *
 * Requires ENCRYPTION_KEY (32-byte hex string) in .env
 */

const crypto = require("crypto");
const env    = require("../config/env");

const ALGORITHM = "aes-256-gcm";
const IV_BYTES  = 12;   // 96-bit IV recommended for GCM
const TAG_BYTES = 16;

function getKey() {
  if (!env.ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY is not set. Add a 32-byte hex key to .env.");
  }
  const buf = Buffer.from(env.ENCRYPTION_KEY, "hex");
  if (buf.length !== 32) throw new Error("ENCRYPTION_KEY must be exactly 32 bytes (64 hex chars).");
  return buf;
}

/**
 * Encrypts a string and returns a base64-encoded payload:
 *   <iv (12 bytes)><authTag (16 bytes)><ciphertext>
 */
function encrypt(plaintext) {
  const key = getKey();
  const iv  = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

/**
 * Decrypts a base64 payload created by encrypt().
 */
function decrypt(encoded) {
  const key  = getKey();
  const buf  = Buffer.from(encoded, "base64");
  const iv   = buf.subarray(0, IV_BYTES);
  const tag  = buf.subarray(IV_BYTES, IV_BYTES + TAG_BYTES);
  const data = buf.subarray(IV_BYTES + TAG_BYTES);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

module.exports = { encrypt, decrypt };
