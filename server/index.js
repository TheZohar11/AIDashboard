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

try {
  connectDB();
} catch (e) {
  console.log(e);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log("app is listening on port" + PORT);
});
