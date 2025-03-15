import clientPromise from "@/pages/api/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password, name, surname, username, dateOfBirth, type } = req.body;

  if (!email || !password || !name || !surname || !username || !dateOfBirth || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("medicore");
    const users = db.collection("users");

    const userExists = await users.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({
      email,
      password: hashedPassword,
      name,
      surname,
      username,
      dateOfBirth,
      type,
      dateCreated: new Date(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}
