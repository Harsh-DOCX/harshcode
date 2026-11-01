# Harsh's Portfolio

My portfolio site, built with React, Express, and MongoDB.

## Run it locally

You’ll need Node.js, MongoDB, and a Resend account to receive contact-form emails. Copy `.env.example` to `.env`, then fill in the database URL, a long random `JWT_SECRET`, and the Resend settings. Verify the sender domain with Resend before using it.

Install the dependencies and start the app:

```bash
npm run install:all
npm run dev
```

The site runs at http://localhost:5173 and the API at http://localhost:5000.

If MongoDB isn’t available, the server uses temporary in-memory storage. That data is lost when the server stops.

The contact form saves messages and emails them through Resend. Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (a verified sender), and `CONTACT_TO_EMAIL` in `.env` or your hosting provider’s environment settings.

## Build and run

```bash
npm run build
npm start
```

To use a custom domain, set `SITE_URL` in `.env` and point your domain to your hosting provider.
