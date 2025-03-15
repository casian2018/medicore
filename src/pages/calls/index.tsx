import React, { useEffect, useState } from 'react';
import Nav from '@/components/nav';
import { join } from 'path';
import Router from 'next/router';


interface Call {
    recipientId: string;
    userId: string;
    channelName: string;
    expiresAt: number;
    token: string;
}
const CallsPage: React.FC = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [userType, setUserType] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserType = async () => {
            const response = await fetch('/api/profile/user');
            const data = await response.json();
            setUserType(data.type);
        };

        const fetchCalls = async () => {
            const response = await fetch('/api/agora/calls');
            const data = await response.json();
            setCalls(data);
        };

        const loadData = async () => {
            await fetchUserType();
            await fetchCalls();
            setTimeout(() => setLoading(false), 250);
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center text-red-600">Loading...</h1>
            </div>
        );
    }

    if (userType !== 'doctor') {
        return (<>
        <Nav />
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center text-red-600">You can't be here, go back</h1>
            </div>
            </>
        );
    }

    const joinCall = async () => {
        // const response = await fetch('/api/agora/join', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ channelName: calls[0].channelName }),
        // });
        // const data = await response.json();
        // window.location.href = data.url;
        // console.log(data);
        Router.push(`/talk/${calls[0].recipientId}`);
    };
        
    return (
        <>
        <Nav />
        <div className="min-h-screen bg-gray-100 p-6 pt-28">
            <ul className="space-y-4">
            {calls.map(call => (
                <li key={call.channelName} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg font-semibold">Recipient ID: <span className="font-normal">{call.recipientId}</span></p>
                <p className="text-lg font-semibold">User ID: <span className="font-normal">{call.userId}</span></p>
                <p className="text-lg font-semibold">Expires At: <span className="font-normal">{new Date(call.expiresAt * 1000).toLocaleString()}</span></p>
                <button className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                onClick={joinCall}
                >Join Call</button>
                </li>
            ))}
            </ul>
        </div>
        </>
    );
};

export default CallsPage;