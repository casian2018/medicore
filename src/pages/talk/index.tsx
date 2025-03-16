import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "@/components/nav";
import Footer from "@/components/footer"

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<
    { question: string; answer: string }[]
  >([]);
  const router = useRouter();

  const questions = [
    "What are your symptoms? (e.g., fever, cough, headache, fatigue)",
    "Do you have any pain? If yes, where is it located?",
    "How severe is your pain on a scale of 1-10?",
    "Do you have any other discomforts, such as chills, dizziness, or nausea?",
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/profile/user");
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  const saveResponse = async () => {
    if (user && user._id) {
      await fetch("/api/saveResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: user._id,
          chat: chatHistory,
        }),
      });
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    // Store the current question and answer
    const newChatHistory = [
      ...chatHistory,
      { question: questions[step], answer: message },
    ];
    setChatHistory(newChatHistory);
    setMessage("");

    if (step < questions.length - 1) {
      // Move to the next question
      setStep(step + 1);
      setLoading(false);
    } else {
      // If all questions are answered, send chat history to Gemini API
      const res = await fetch("/api/gemini/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newChatHistory
            .map((q) => `${q.question} ${q.answer}`)
            .join("\n"),
        }),
      });

      const data = await res.json();
      setResponse(data.reply || "Error: Unable to get a response.");
      saveResponse();
      setLoading(false);
    }
  };

  const contactSpecialist = () => {
    router.push("/talk/video");
  };

  return (
    <>
    <Nav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 pt-24">
        <div className="w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-md">
          {response || questions[step]}
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
        {loading
          ? "Thinking..."
          : step < questions.length - 1
          ? "Next"
          : "Send"}
          </button>
          {step >= questions.length - 1 && (
        <button
          onClick={() => {
            contactSpecialist();
            saveResponse();
          }}
          className="mt-3 w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md transition"
        >
          Contact Specialist
        </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
