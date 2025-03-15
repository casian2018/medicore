import { NextApiRequest, NextApiResponse } from 'next';
 // Uses fixed MongoDB connection
import { ObjectId } from 'mongodb';
import clientPromise from '../../mongodb';

export default async function handler(req, res) {
    if (!req || !req.method) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    if (req.method === 'POST') {
        try {
            const { id } = req.query;
            const { user, title, content, images } = req.body;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        if (!user || !content) {
            return res.status(400).json({ message: 'User and content are required' });
        }

        const client = await clientPromise;
        const db = client.db('medicore');

        // Find the post
        const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create new response object
        const newResponse = {
            _id: new ObjectId(),
            user,
            date: new Date().toISOString(),
            title: title || '',
            content,
            images: images || {},
        };

        // Add the response to the post
        await db.collection('posts').updateOne(
            { _id: new ObjectId(id) },
            { $push: { responses: newResponse } }
        );

        return res.status(200).json({ message: 'Response added successfully', response: newResponse });
    } catch (error) {
        console.error("Error in /api/forum/[id]/response:", error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        }
    }
}
