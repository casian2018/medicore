import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { MongoClient } from 'mongodb'

interface ForumPost {
    id: string
    author: string
    title: string
    content: string
    timestamp: Date
}

const uri = process.env.MONGODB_URI
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}
const client = new MongoClient(uri)

async function savePostToDB(post: ForumPost) {
    try {
        await client.connect()
        const database = client.db('medicore')
        const collection = database.collection('posts')
        const result = await collection.insertOne(post)
        return result
    } finally {
        await client.close()
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content, author } = req.body

        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Title, content, and author are required' })
        }
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}
const client = new MongoClient(uri)
        const newPost: ForumPost = {
            id: uuidv4(),
            author,
            title,
            content,
            timestamp: new Date()
        }

        try {
            const result = await savePostToDB(newPost)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).json({ message: 'Error saving post to database', error })
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}
