// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// let client;
// let clientPromise;

// if (!uri) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// export default clientPromise;
import { MongoClient, ObjectId } from 'mongodb';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!uri || !JWT_SECRET) {
    throw new Error('Missing MONGODB_URI or JWT_SECRET in environment variables');
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;
export default clientPromise;

// export default async function getUserData(req, res) {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Only GET requests are allowed' });
//     }

//     const cookies = parse(req.headers.cookie || '');
//     const token = cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: 'Not authenticated' });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const userId = decoded.userId;

//         const client = await clientPromise;
//         const database = client.db('medicore');
//         const collection = database.collection('users');
//         const user = await collection.findOne({ _id: new ObjectId(userId) });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({
//             education: user.education || 'N/A',
//             languages: user.languages || 'N/A',
//             department: user.department || 'N/A',
//             workHistory: user.workHistory || 'N/A',
//             organization: user.organization || 'N/A',
//             birthday: user.birthday || 'N/A',
//         });
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
//             return res.status(401).json({ message: 'Invalid or expired token' });
//         }
//         res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// }
