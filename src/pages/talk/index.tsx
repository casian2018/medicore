import { useState, useEffect } from "react";

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

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
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Chat with Gemini</h1>
      <div className="w-full max-w-lg p-4 bg-gray-800 rounded-lg shadow-md">
        <p className="mb-2 text-gray-300">{response || "Loading question..."}</p>
        <textarea
          className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your response..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition disabled:bg-gray-500"
        >
          {loading ? "Thinking..." : step < questions.length - 1 ? "Next" : "Send"}
        </button>
      </div>

      {step >= questions.length && response && (
        <div className="w-full max-w-lg mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Gemini's Response:</h2>
          <pre className="whitespace-pre-wrap bg-gray-700 p-3 rounded-md text-gray-300">{response}</pre>
        </div>
      )}
    </div>
  );
}
