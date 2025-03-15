import { useEffect, useRef, useState, JSX } from "react";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;
const CHANNEL_NAME = "main";
const UID = Math.floor(Math.random() * 10000);

export default function VideoCallPage(): JSX.Element {
    const [agoraEngine, setAgoraEngine] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const localVideoRef = useRef<HTMLDivElement>(null);
    const remoteVideoRef = useRef<HTMLDivElement>(null);
    const [joined, setJoined] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        
        // Fetch token
        fetch(`/api/agora/agoraToken?channelName=${CHANNEL_NAME}&uid=${UID}`)
            .then(res => res.json())
            .then(data => {
                setToken(data.token);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching token:", err);
                setIsLoading(false);
            });

        // Load Agora SDK
        if (typeof window !== "undefined") {
            import("agora-rtc-sdk-ng").then((AgoraRTC) => {
                setAgoraEngine(AgoraRTC.default.createClient({ mode: "rtc", codec: "vp8" }));
            });
        }
    }, []);

    async function startCall(): Promise<void> {
        try {
            // Request camera & microphone permissions
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("Camera & Microphone access granted", stream);

            if (!token) return alert("Token not yet available");
            if (!APP_ID) return alert("App ID not available");
            if (!agoraEngine) return alert("Agora Engine not initialized");

            const client = agoraEngine;

            client.on("user-published", async (user: any, mediaType: string) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video" && remoteVideoRef.current) {
                    user.videoTrack.play(remoteVideoRef.current);
                }
                if (mediaType === "audio") {
                    user.audioTrack?.play();
                }
            });

            console.log("Joining channel with token:", token);
            await client.join(APP_ID, CHANNEL_NAME, token, UID);
            console.log("Successfully joined channel");

            const AgoraRTC = await import("agora-rtc-sdk-ng");
            const localVideoTrack = await AgoraRTC.default.createCameraVideoTrack();
            const localAudioTrack = await AgoraRTC.default.createMicrophoneAudioTrack();
            if (localVideoRef.current) {
                localVideoTrack.play(localVideoRef.current);
            }

            await client.publish([localVideoTrack, localAudioTrack]);
            setJoined(true);
        } catch (error) {
            console.error("Error joining channel:", error);
            if (error instanceof Error) {
                alert(`Failed to join channel: ${error.message}`);
            } else {
                alert("Failed to join channel: An unknown error occurred");
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Video Call</h1>
            <div className="grid grid-cols-2 gap-4 p-4 border border-gray-300 rounded-lg">
                <div ref={localVideoRef} className="w-64 h-48 bg-gray-200 relative">
                    {!joined && <div className="absolute inset-0 flex items-center justify-center text-gray-500">Local Video</div>}
                </div>
                <div ref={remoteVideoRef} className="w-64 h-48 bg-gray-200 relative">
                    {!joined && <div className="absolute inset-0 flex items-center justify-center text-gray-500">Remote Video</div>}
                </div>
            </div>
            
            <div className="mt-6">
                {isLoading ? (
                    <button className="bg-gray-300 px-6 py-2 rounded-lg" disabled>
                        Loading...
                    </button>
                ) : !token ? (
                    <button className="bg-red-600 px-6 py-2 rounded-lg" disabled>
                        Token Error
                    </button>
                ) : !joined ? (
                    <button 
                        onClick={startCall}
                        className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg text-white"
                    >
                        Join Call
                    </button>
                ) : (
                    <p className="text-green-600">Connected</p>
                )}
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
                {isLoading ? (
                    "Loading token..."
                ) : token ? (
                    `Token loaded. Channel: ${CHANNEL_NAME}`
                ) : (
                    "Failed to load token. Check API endpoint."
                )}
            </div>
        </div>
    );
}