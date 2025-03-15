import { JSX, useEffect, useRef, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID as string;
const CHANNEL_NAME = "main";
const UID = Math.floor(Math.random() * 10000);
const PLACEHOLDER_IMAGE_URL = "/hero1.jpg"; // Replace with your image URL

export default function Video(): JSX.Element {
    const [agoraEngine, setAgoraEngine] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const localVideoRef = useRef<HTMLDivElement>(null);
    const remoteVideoRef = useRef<HTMLDivElement>(null);
    const [joined, setJoined] = useState<boolean>(false);
    const [localVideoTrack, setLocalVideoTrack] = useState<any>(null);
    const [localAudioTrack, setLocalAudioTrack] = useState<any>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);

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
            setIsConnecting(true); // Show spinner when the button is clicked
    
            // Request camera & microphone permissions
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            console.log("Camera & Microphone access granted", stream);
    
            if (!token) {
                alert("Token not yet available");
                setIsConnecting(false);
                return;
            }
            if (!APP_ID) {
                alert("App ID not available");
                setIsConnecting(false);
                return;
            }
            if (!agoraEngine) {
                alert("Agora Engine not initialized");
                setIsConnecting(false);
                return;
            }
    
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
            const videoTrack = await AgoraRTC.default.createCameraVideoTrack();
            const audioTrack = await AgoraRTC.default.createMicrophoneAudioTrack();
            setLocalVideoTrack(videoTrack);
            setLocalAudioTrack(audioTrack);
            if (localVideoRef.current) {
                videoTrack.play(localVideoRef.current);
            }
            await client.publish([videoTrack, audioTrack]);
            setJoined(true);
        } catch (error) {
            console.error("Error joining channel:", error);
            alert(`Failed to join channel: ${error instanceof Error ? error.message : "An unknown error occurred"}`);
        } finally {
            setIsConnecting(false); // Hide spinner after connecting or on error
        }
    }
    
    function toggleVideo(): void {
        if (localVideoTrack) {
            if (isVideoEnabled) {
                localVideoTrack.setEnabled(false);
            } else {
                localVideoTrack.setEnabled(true);
            }
            setIsVideoEnabled(!isVideoEnabled);
        }
    }

    function toggleAudio(): void {
        if (localAudioTrack) {
            if (isAudioEnabled) {
                localAudioTrack.setEnabled(false);
            } else {
                localAudioTrack.setEnabled(true);
            }
            setIsAudioEnabled(!isAudioEnabled);
        }
    }

    async function leaveCall(): Promise<void> {
        if (agoraEngine) {
            // Stop the local video and audio tracks
            if (localVideoTrack) {
                localVideoTrack.stop();
                localVideoTrack.close();
            }
            if (localAudioTrack) {
                localAudioTrack.stop();
                localAudioTrack.close();
            }

            // Leave the channel
            await agoraEngine.leave();
            setJoined(false);
            setLocalVideoTrack(null);
            setLocalAudioTrack(null);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-black">
            <h1 className="text-4xl font-bold mb-6 text-red-600">Video Call</h1>
            <div className="grid grid-cols-2 gap-6 p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
                <div ref={localVideoRef} className="w-64 h-48 bg-gray-200 relative">
                    {!isVideoEnabled && (
                        <img src={PLACEHOLDER_IMAGE_URL} alt="Placeholder" className="absolute inset-0 w-full h-full object-cover" />
                    )}
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
                    isConnecting ? (
                        <CgSpinner className="animate-spin text-red-600 text-3xl" />
                    ) : (
                        <button 
                            onClick={startCall}
                            className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg text-white"
                        >
                            Join Call
                        </button>
                    )
                ):(
                    <div className="flex flex-col items-center">
                        <p className="text-green-600 mb-4">Connected</p>
                        <div className="flex space-x-4">
                            <button 
                                onClick={toggleVideo}
                                className={`px-6 py-2 rounded-lg text-white ${isVideoEnabled ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                            >
                                {isVideoEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
                            </button>
                            <button 
                                onClick={toggleAudio}
                                className={`px-6 py-2 rounded-lg text-white ${isAudioEnabled ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                            >
                                {isAudioEnabled ? 'Turn Off Microphone' : 'Turn On Microphone'}
                            </button>
                            <button 
                                onClick={leaveCall}
                                className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg text-white"
                            >
                                Leave Call
                            </button>
                        </div>
                    </div>
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
