"use strict";

const nodemailer = require("nodemailer");
const env    = require("../config/env");
const logger = require("./logger");

async function sendEmail({ subject, html, text }) {
  if (!env.isEmailConfigured) {
    logger.info(`Email skipped (SMTP not configured): ${subject}`);
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host:   env.SMTP_HOST,
    port:   env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth:   { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  return transporter.sendMail({
    from:    env.MAIL_FROM || env.SMTP_USER,
    to:      env.MAIL_TO,
    subject,
    html,
    text,
  });
}

module.exports = sendEmail;
