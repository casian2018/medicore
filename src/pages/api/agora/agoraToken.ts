import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID;
    const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;
    const { channelName, uid } = req.query;

    if (!channelName || !uid) {
        return res.status(400).json({ error: "Channel name and UID are required" });
    }

    if (!APP_ID || !APP_CERTIFICATE) {
        console.error("Missing AGORA environment variables");
        return res.status(500).json({ error: "Server configuration error" });
    }

    try {
        const role = RtcRole.PUBLISHER;
        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTimestamp + expirationTimeInSeconds;

        const token = RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            channelName as string,
            parseInt(uid as string) || 0,
            role,
            privilegeExpireTime
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
}
// import { NextApiRequest, NextApiResponse } from "next";
// import { RtcTokenBuilder, RtcRole } from "agora-access-token";
// import { MongoClient } from "mongodb";

// const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;
// const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE as string;
// const MONGO_URI = process.env.MONGODB_URI as string;

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method Not Allowed" });
//     }

//     const { userId, recipientId } = req.body; // Include recipientId for 1-on-1 calls

//     if (!userId || !recipientId) {
//         return res.status(400).json({ error: "Missing userId or recipientId" });
//     }

//     try {
//         // Generate a unique channel name (e.g., combining user IDs)
//         const channelName = `call_${userId}_${recipientId}`;

//         // Generate Agora Token
//         const expirationTimeInSeconds = 3600; // 1 hour
//         const currentTimestamp = Math.floor(Date.now() / 1000);
//         const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

//         const token = RtcTokenBuilder.buildTokenWithUid(
//             APP_ID,
//             APP_CERTIFICATE,
//             channelName,
//             0, // Use 0 for UID-based tokens
//             RtcRole.PUBLISHER,
//             privilegeExpiredTs
//         );

//         // Store the token and channel in the database
//         const client = new MongoClient(MONGO_URI);
//         await client.connect();
//         const db = client.db("medicore");
//         const callsCollection = db.collection("calls");

//         await callsCollection.updateOne(
//             { userId, recipientId },
//             { $set: { token, channelName, expiresAt: privilegeExpiredTs } },
//             { upsert: true }
//         );

//         await client.close();

//         res.status(200).json({ token, channelName });
//     } catch (error) {
//         console.error("Error generating token:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export default handler;
