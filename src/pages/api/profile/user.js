import { MongoClient, ObjectId } from 'mongodb';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const JWT_SECRET = process.env.JWT_SECRET;

async function getUserData(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Only GET requests are allowed' });
        return;
    }

    console.log(req.cookies)
    const cookies = req.cookies;
    const token = cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        await client.connect();
        const database = client.db('medicore');
        const collection = database.collection('users');
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            res.status(500).json({ message: 'User not found', userId,token, decoded });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Not authenticated' });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } finally {
        await client.close();
    }
}

export default getUserData;