const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Portfolio = require("./models/Portfolio");
const Admin = require("./models/Admin");
const Message = require("./models/Message");
const defaultPortfolio = require("./data/defaultPortfolio");

const memory = {
  usingMongo: false,
  portfolio: JSON.parse(JSON.stringify(defaultPortfolio)),
  admin: null,
  messages: [],
};

async function connectAndSeed(mongoose, mongoUri) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password || !process.env.JWT_SECRET) {
    throw new Error("ADMIN_USERNAME, ADMIN_PASSWORD, and JWT_SECRET must be set in .env.");
  }

  try {
    await mongoose.connect(mongoUri);
    memory.usingMongo = true;

    const existing = await Portfolio.findOne();
    if (!existing) {
      await Portfolio.create(defaultPortfolio);
    }

    let admin = await Admin.findOne({ username });
    if (!admin) {
      admin = await Admin.create({
        username,
        passwordHash: await bcrypt.hash(password, 12),
      });
    }
    return { ok: true };
  } catch (error) {
    memory.usingMongo = false;
    memory.admin = {
      username,
      passwordHash: await bcrypt.hash(password, 12),
    };
    console.warn("MongoDB unavailable. Using in-memory store until the database is reachable.");
    console.warn(error.message);
    return { ok: false, error: error.message };
  }
}

async function getPortfolio() {
  if (memory.usingMongo) {
    const doc = await Portfolio.findOne().lean();
    return doc || defaultPortfolio;
  }
  return memory.portfolio;
}

async function savePortfolio(payload) {
  const clean = { ...payload };
  delete clean._id;
  delete clean.__v;
  delete clean.createdAt;
  delete clean.updatedAt;
  if (memory.usingMongo) {
    const doc = await Portfolio.findOneAndUpdate({}, clean, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }).lean();
    return doc;
  }
  memory.portfolio = { ...memory.portfolio, ...clean };
  return memory.portfolio;
}

async function login(username, password) {
  let admin;
  if (memory.usingMongo) {
    admin = await Admin.findOne({ username });
  } else {
    admin = memory.admin?.username === username ? memory.admin : null;
  }
  if (!admin) return null;
  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) return null;
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "12h" });
}

async function saveMessage(body) {
  if (memory.usingMongo) {
    return Message.create(body);
  }
  const item = { ...body, createdAt: new Date().toISOString() };
  memory.messages.unshift(item);
  return item;
}

async function listMessages() {
  if (memory.usingMongo) {
    return Message.find().sort({ createdAt: -1 }).lean();
  }
  return memory.messages;
}

module.exports = {
  memory,
  connectAndSeed,
  getPortfolio,
  savePortfolio,
  login,
  saveMessage,
  listMessages,
};
