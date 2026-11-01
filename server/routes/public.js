const express = require("express");
const { getPortfolio, saveMessage } = require("../store");

const router = express.Router();

router.get("/portfolio", async (_req, res) => {
  try {
    const data = await getPortfolio();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Unable to load portfolio." });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const message = String(req.body.message || "").trim();
    if (name.length < 2 || !email.includes("@") || message.length < 10) {
      return res.status(400).json({
        error: "Please provide your name, a valid email, and a message of at least 10 characters.",
      });
    }
    await saveMessage({
      name,
      email,
      message,
      utm: {
        source: req.body.utmSource || "",
        medium: req.body.utmMedium || "",
        campaign: req.body.utmCampaign || "",
        content: req.body.utmContent || "",
        term: req.body.utmTerm || "",
      },
    });
    res.status(201).json({ ok: true, notice: "Message received. Thank you." });
  } catch {
    res.status(500).json({ error: "The message could not be sent. Try again shortly." });
  }
});

router.get("/search", async (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  if (!q) return res.json({ results: [] });
  const data = await getPortfolio();
  const results = [];

  const pages = [
    { title: "Home", path: "/", text: `${data.profile.name} ${data.profile.headline} ${data.profile.summary}` },
    { title: "About", path: "/about", text: `${data.profile.summary} ${(data.profile.traits || []).join(" ")}` },
    { title: "Skills", path: "/skills", text: (data.skills || []).map((s) => s.name).join(" ") },
    { title: "Projects", path: "/projects", text: (data.projects || []).map((p) => p.title).join(" ") },
    { title: "Experience", path: "/experience", text: (data.experience || []).map((e) => `${e.role} ${e.company}`).join(" ") },
    { title: "Education", path: "/education", text: (data.education || []).map((e) => e.title).join(" ") },
    { title: "Contact", path: "/contact", text: "contact email message" },
  ];

  pages.forEach((page) => {
    if (page.text.toLowerCase().includes(q) || page.title.toLowerCase().includes(q)) {
      results.push({ type: "Page", title: page.title, path: page.path });
    }
  });

  (data.projects || []).forEach((project) => {
    const hay = `${project.title} ${project.summary} ${project.stack}`.toLowerCase();
    if (hay.includes(q)) {
      results.push({ type: "Project", title: project.title, path: `/projects/${project.slug}` });
    }
  });

  (data.skills || []).forEach((skill) => {
    if (skill.name.toLowerCase().includes(q)) {
      results.push({ type: "Skill", title: skill.name, path: "/skills" });
    }
  });

  res.json({ results });
});

module.exports = router;
