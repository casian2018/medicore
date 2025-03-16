// import { clientPromise } from "@/pages/api/mongodb";

import clientPromise from "./mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { patientId, chat } = req.body;

    if (!patientId || !chat) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const client = await clientPromise;
    const database = client.db('medicore')
    const responseCollection = database.collection("responses");

    const newResponse = {
      patientId,
      chat,
      createdAt: new Date(),
    };

    await responseCollection.insertOne(newResponse);

    res.status(200).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
