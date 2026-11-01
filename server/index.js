const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");
const { connectAndSeed } = require("./store");
const { sitemapXml, robotsTxt, llmsTxt } = require("./seo");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.get("/sitemap.xml", async (_req, res) => {
  res.type("application/xml").send(await sitemapXml());
});
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(robotsTxt());
});
app.get("/llms.txt", async (_req, res) => {
  res.type("text/plain").send(await llmsTxt());
});

const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next();
  });
});

async function start() {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/harsh-portfolio";
  await connectAndSeed(mongoose, mongoUri);
  app.listen(PORT, () => {
    console.log(`API ready on http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exitCode = 1;
});
