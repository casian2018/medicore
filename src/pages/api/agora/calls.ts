import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const client = new MongoClient(uri);

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        await client.connect();
        const database = client.db('medicore');
        const callsCollection = database.collection('calls');
        const calls = await callsCollection.find({}).toArray();
        res.status(200).json(calls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch calls' });
    } finally {
        await client.close();
    }
}

export default handler;