import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import VideoCallPage from "../VideoCallPage"; // Adjust the import path as necessary

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [videoCallId, setVideoCallId] = useState<string | null>(null);
  // const router = useRouter();
  const questions = [
    "What are your symptoms? (e.g., fever, cough, headache, fatigue)",
    "Do you have any pain? If yes, where is it located?",
    "How severe is your pain on a scale of 1-10?",
    "Do you have any other discomforts, such as chills, dizziness, or nausea?",
  ];

  useEffect(() => {
    if (step < questions.length) {
      setResponse(questions[step]);
    }
  }, [step]);

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Fetch video call ID from VideoCallPage
    const fetchVideoCallId = async () => {
      const res = await fetch("/api/videoCallId");
      const data = await res.json();
      setVideoCallId(data.videoCallId);
    };

    fetchVideoCallId();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse("");

    if (step < questions.length - 1) {
      setStep(step + 1);
      setMessage("");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/gemini/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply || "Error: Unable to get a response.");
    setLoading(false);

    // Save chat and video call details to the database
    if (user && videoCallId) {
      await fetch("/api/saveChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          chat: { questions, responses: [message, data.reply] },
          videoCallId,
        }),
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Hey,</h1>
      <div className="w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="mb-2 text-gray-700">{response || "Loading question..."}</p>
        <textarea
          className="w-full p-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your response..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="mt-3 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md transition disabled:bg-gray-500"
        >
          {loading ? "Thinking..." : step < questions.length - 1 ? "Next" : "Send"}
        </button>
      </div>

      {step >= questions.length && response && (
        <div className="w-full max-w-lg mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2 text-red-600">Gemini's Response:</h2>
          <pre className="whitespace-pre-wrap bg-white p-3 rounded-md text-gray-700">{response}</pre>
        </div>
      )}

      <div className="w-full max-w-lg mt-8">
        <VideoCallPage />
      </div>
    </div>
  );
}
