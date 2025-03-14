
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const tag = req.query.tag as string;

  try {
    await client.connect();
    const db = client.db("medicore");
    const posts = await db.collection("posts").find({ tags: tag }).toArray();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  } finally {
    await client.close();
  }
}