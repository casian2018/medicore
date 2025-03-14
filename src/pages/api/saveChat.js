import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests are allowed' });
        return;
    }

    const { userId, chat, videoCallId } = req.body;

    if (!userId || !chat || !videoCallId) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        await client.connect();
        const database = client.db('medicore');
        const collection = database.collection('chats');

        const result = await collection.insertOne({
            userId,
            chat,
            videoCallId,
            createdAt: new Date()
        });

        res.status(200).json({ message: 'Chat saved successfully', chatId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } finally {
        await client.close();
    }
}