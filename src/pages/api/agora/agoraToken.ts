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
