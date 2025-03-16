import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { MongoClient } from 'mongodb'

interface ForumPost {
    id: string
    author: string
    title: string
    content: string
    timestamp: Date
    tags: string[]
    images: object
    responses: object[]
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
        const { title, content, author, tags, image } = req.body

        if (!title || !content || !author || !tags || tags.length === 0) {
            return res.status(400).json({ message: 'Title, content, author, and tags are required' })
        }

        const newPost: ForumPost = {
            id: uuidv4(),
            author,
            title,
            content,
            images: image ? [{ name: image }] : [], // Ensure images field is always an array
            responses: [], // Initialize with an empty array for responses
            timestamp: new Date(),
            tags: tags
        }

        try {
            await savePostToDB(newPost)
            return res.status(201).json(newPost)
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Now you can access error.message and other properties safely
                console.error('Error saving post to database:', error.message)
                return res.status(500).json({ message: 'Error saving post to database', error: error.message })
            } else {
                console.error('Unknown error:', error)
                return res.status(500).json({ message: 'Unknown error occurred', error })
            }
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' })
    }
}