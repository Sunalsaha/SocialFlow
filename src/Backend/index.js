// index.js (CommonJS version for Node.js compatibility)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const client = new MongoClient(MONGO_URI);
let db;

client.connect().then(() => {
  db = client.db("social-analytics");
  console.log("✅ Connected to MongoDB");
});

// JWT Auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

// AI Assistant Route
app.post("/api/chat", verifyToken, async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You're an AI assistant that helps social media users grow with insights.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;

    // Save chat to DB
    await db.collection("chats").insertOne({
      userId,
      message,
      reply,
      createdAt: new Date(),
    });

    res.json({ reply });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to reach AI." });
  }
});

// Chat history route
app.get("/api/chat/history", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const history = await db
    .collection("chats")
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`✅ AI Chat backend running on http://localhost:${PORT}`);
});
