function getEmailConfig() {
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    const error = new Error("Email delivery is not configured on the server.");
    error.code = "EMAIL_NOT_CONFIGURED";
    throw error;
  }
  return { apiKey: RESEND_API_KEY, from: CONTACT_FROM_EMAIL, to: CONTACT_TO_EMAIL };
}

function assertEmailConfigured() {
  getEmailConfig();
}

async function sendContactEmail({ name, email, message }) {
  const config = getEmailConfig();
  let response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: email,
        subject: "New portfolio contact message",
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });
  } catch {
    const error = new Error("Unable to reach the email service.");
    error.code = "EMAIL_DELIVERY_FAILED";
    throw error;
  }

  if (!response.ok) {
    const error = new Error(`The email service rejected the message (HTTP ${response.status}).`);
    error.code = "EMAIL_DELIVERY_FAILED";
    throw error;
  }
}

module.exports = { assertEmailConfigured, sendContactEmail };
