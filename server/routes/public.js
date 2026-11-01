const express = require("express");
const { getPortfolio, saveMessage } = require("../store");
const { assertEmailConfigured, sendContactEmail } = require("../mailer");

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
  const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (
    name.length < 2 ||
    name.length > 120 ||
    email.length > 180 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10 ||
    message.length > 4000
  ) {
    return res.status(400).json({
      error: "Enter a name, valid email, and a message between 10 and 4000 characters.",
    });
  }

  try {
    assertEmailConfigured();
  } catch (error) {
    if (error.code === "EMAIL_NOT_CONFIGURED") {
      return res.status(503).json({
        error: "Email delivery is not configured. Please contact me using one of the links instead.",
      });
    }
    console.error("Unable to validate contact email configuration:", error.message);
    return res.status(500).json({ error: "The contact form is temporarily unavailable." });
  }

  try {
    await saveMessage({
      name,
      email,
      message,
      utm: {
        source: String(body.utmSource || "").slice(0, 200),
        medium: String(body.utmMedium || "").slice(0, 200),
        campaign: String(body.utmCampaign || "").slice(0, 200),
        content: String(body.utmContent || "").slice(0, 200),
        term: String(body.utmTerm || "").slice(0, 200),
      },
    });
  } catch (error) {
    console.error("Unable to save contact message:", error.message);
    return res.status(500).json({ error: "The message could not be saved. Please try again." });
  }

  try {
    await sendContactEmail({ name, email, message });
    return res.status(201).json({ ok: true, emailSent: true, notice: "Message sent. Thank you." });
  } catch (error) {
    console.error("Contact message saved, but email notification failed:", error.message);
    return res.status(201).json({
      ok: true,
      emailSent: false,
      notice: "Your message was saved, but the email notification failed. Please contact me directly.",
    });
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
