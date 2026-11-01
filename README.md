# Harsh's Portfolio

My portfolio site, built with React, Express, and MongoDB.

## Run it locally

You’ll need Node.js and MongoDB. Copy `.env.example` to `.env`, then set your database URL and a long, random `JWT_SECRET`.

Install the dependencies and start the app:

```bash
npm run install:all
npm run dev
```

The site runs at http://localhost:5173 and the API at http://localhost:5000.

If MongoDB isn’t available, the server uses temporary in-memory storage. That data is lost when the server stops.

## Build and run

```bash
npm run build
npm start
```

To use a custom domain, set `SITE_URL` in `.env` and point your domain to your hosting provider.
