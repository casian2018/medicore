import { NextApiRequest, NextApiResponse } from 'next';
import Agora from 'agora-access-token';

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE as string;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { uid, channelName, role } = req.body;

        if (role !== 'doctor') {
            return res.status(403).json({ error: 'Only doctors can join the call' });
        }

        if (!uid || !channelName) {
            return res.status(400).json({ error: 'uid and channelName are required' });
        }

        const expirationTimeInSeconds = 3600;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        const token = Agora.RtcTokenBuilder.buildTokenWithUid(
            APP_ID,
            APP_CERTIFICATE,
            channelName,
            uid,
            Agora.RtcRole.PUBLISHER,
            privilegeExpiredTs
        );

        return res.status(200).json({ token });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}