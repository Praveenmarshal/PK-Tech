"use strict";

const sendEmail = require("../utils/sendEmail");

/**
 * email.service.js — higher-level email helpers.
 * Add templated emails here as the project grows.
 */

async function sendContactNotification({ name, email, subject, message }) {
  return sendEmail({
    subject: `ZILIST inquiry: ${subject}`,
    text:    `${name} (${email}) wrote:\n\n${message}`,
    html:    `<h2>ZILIST inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p>${message}</p>`,
  });
}

module.exports = { sendContactNotification };
