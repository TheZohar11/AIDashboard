import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log("app is listening on port" + PORT);
});
