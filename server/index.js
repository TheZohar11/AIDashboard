import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
if (!uri) {
  throw new Error("MONGODB_URI is not set in .env");
}

const client = new MongoClient(uri);
let usageCollection;

async function connectDB() {
  await client.connect();
  const db = client.db("AIDashboard");
  usageCollection = db.collection("usage");
  console.log("connected to mongo");
}
connectDB().catch(console.error);

app.post("/usage", async (req, res) => {
  try {
    const result = await usageCollection.insertOne(req.body);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/usage", async (req, res) => {
  try {
    const { tool, model, from, until } = req.query;
    const filter = {};
    if (tool && tool !== "all") filter.tool = tool;
    if (model && model !== "all") filter.model = model;
    if (from || until) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (until) filter.date.$lte = until;
    }
    const records = await usageCollection.find(filter).toArray();
    res.json(records);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/recommendations", async (req, res) => {
  try {
    const { records } = req.body;
    if (!records || records.length === 0) {
      return res.status(400).json({ error: "No records provided" });
    }
    const text = await googleApi(records);
    res.json({ recommendations: text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function googleApi(records) {
  const totalCost = records.reduce((s, r) => s + r.cost, 0).toFixed(3);
  const toolCosts = records.reduce((acc, r) => {
    acc[r.tool] = (acc[r.tool] || 0) + r.cost;
    return acc;
  }, {});
  const breakdown = Object.entries(toolCosts)
    .map(([tool, cost]) => `${tool}: $${cost.toFixed(3)}`)
    .join(", ");

  const prompt = `Our engineering team spent $${totalCost} on AI tools across ${records.length} usage records. Cost breakdown by tool: ${breakdown}. Give exactly 3 short bullet-point recommendations to reduce costs or improve efficiency. Be specific and actionable. No intro text, just the 3 bullets. max 20 words per bullet point!`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log("app is listening on port" + PORT);
});
