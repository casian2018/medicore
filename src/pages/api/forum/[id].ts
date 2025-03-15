import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
}
clientPromise = (global as any)._mongoClientPromise;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid post ID' });
    }

    try {
        const client = await clientPromise;
        const database = client.db('medicore');
        const collection = database.collection('posts');
        const post = await collection.findOne({ _id: new ObjectId(id) });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({ message: 'Error fetching post from database', error });
    }
}
