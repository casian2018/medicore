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
      <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-800 p-6 pt-24">
        <div className="w-full max-w-2xl space-y-6">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-8">
            Medical Assessment Chat
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Chat History */}
            <div className="min-h-[10px] max-h-[70vh] overflow-y-auto ...">
              {chatHistory.map((chat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-red-50 p-4 rounded-xl">
                      <p className="font-medium text-red-600">Question {index + 1}</p>
                      <p className="text-gray-700">{chat.question}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-gray-100 p-4 rounded-xl">
                      <p className="font-medium text-gray-600">Your Response</p>
                      <p className="text-gray-800">{chat.answer}</p>
                    </div>
                  </div>
                </div>
              ))}

              {response && (
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <p className="font-medium text-green-600 mb-2">Medical Analysis:</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
                </div>
              )}
            </div>

            {/* Current Question */}
            {!response && (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <p className="font-medium text-blue-600 mb-2">
                  Question {step + 1} of {questions.length}
                </p>
                <p className="text-gray-800">{questions[step]}</p>
              </div>
            )}

            {/* Input Area */}
            <div className="space-y-4">
              <textarea
                className="w-full p-4 rounded-lg border border-gray-200 focus:border-red-300 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your response here..."
              />

              <div className="flex flex-col gap-3">
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : step < questions.length - 1 ? (
                    "Next Question →"
                  ) : (
                    "Get Analysis"
                  )}
                </button>

                {step >= questions.length - 1 && (
                  <button
                    onClick={() => {
                      contactSpecialist();
                      saveResponse();
                    }}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all"
                  >
                    Contact Specialist ↗
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}