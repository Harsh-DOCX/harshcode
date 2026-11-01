# Harsh — MERN Portfolio

Glassmorphism portfolio (black, silver, crimson).

## Custom domain

Point DNS for `www.harshog.dev` (or your own domain) to the host:

1. Add an A/AAAA or CNAME record for `www` to your Node host (Render, Railway, VPS, etc.).
2. Set `SITE_URL=https://www.harshog.dev` in `.env`.
3. The `client/public/CNAME` file is included for GitHub Pages-style hosts.

Replace `harshog.dev` everywhere if you register a different name.

## Run locally

Create `.env` from `.env.example` and set a unique `JWT_SECRET` and strong `ADMIN_PASSWORD`.

```bash
npm run install:all
npm run dev
```

- Site: http://localhost:5173
- API: http://localhost:5000

MongoDB is preferred (`MONGO_URI`). If Mongo is down, the API keeps an in-memory copy so you can still develop.


## Production

```bash
npm run build
npm start
```

Client production builds do not emit source maps (`vite.config.js` `sourcemap: false`).
