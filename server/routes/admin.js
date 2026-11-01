const express = require("express");
const { requireAdmin } = require("../middleware/auth");
const { login, savePortfolio, getPortfolio, listMessages } = require("../store");

const router = express.Router();
const attempts = new Map();

function tooMany(ip) {
  const now = Date.now();
  const rec = attempts.get(ip) || { count: 0, start: now };
  if (now - rec.start > 15 * 60 * 1000) {
    attempts.set(ip, { count: 1, start: now });
    return false;
  }
  rec.count += 1;
  attempts.set(ip, rec);
  return rec.count > 12;
}

router.post("/login", async (req, res) => {
  const ip = req.ip || "local";
  if (tooMany(ip)) {
    return res.status(429).json({ error: "Too many sign-in attempts. Wait and try again." });
  }
  const username = String(req.body.username || "");
  const password = String(req.body.password || "");
  try {
    const token = await login(username, password);
    if (!token) {
      return res.status(401).json({ error: "Those credentials are not valid." });
    }
    res.json({ token });
  } catch {
    res.status(500).json({ error: "Sign-in failed." });
  }
});

router.get("/portfolio", requireAdmin, async (_req, res) => {
  res.json(await getPortfolio());
});

router.put("/portfolio", requireAdmin, async (req, res) => {
  try {
    const saved = await savePortfolio(req.body);
    res.json(saved);
  } catch {
    res.status(500).json({ error: "Update failed." });
  }
});

router.get("/messages", requireAdmin, async (_req, res) => {
  res.json(await listMessages());
});

module.exports = router;
