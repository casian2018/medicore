import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from '@/components/nav'
import Footer from '@/components/footer'

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const questions = [
    "What are your symptoms? (e.g., fever, cough, headache, fatigue)",
    "Do you have any pain? If yes, where is it located?",
    "How severe is your pain on a scale of 1-10?",
    "Do you have any other discomforts, such as chills, dizziness, or nausea?",
  ];

  useEffect(() => {
    // Fetch user details
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
          chat: { message:[message], response:[response] },
        }),
      });
    }
  };

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

  const contactSpecialist = () => {
    router.push("/talk/video");
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex flex-col justify-evenly h-2xl mt-25">
        
          <div className="p-4 border-b border-gray-200 bg-white rounded-t-xl">
            <h1 className="text-xl font-semibold text-gray-800">Medical Assistant</h1>
            <p className="text-sm text-gray-600">Let's assess your symptoms</p>
          </div>

     
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
 
            <div className="flex items-start gap-3">
              <div className="bg-red-200 p-3 rounded-2xl max-w-[70%]">
                <p className="text-gray-800 text-sm">{response || questions[step]}</p>
              </div>
            </div>

         
            <div className="border-t border-gray-100 pt-4">
              <textarea
                className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              />
          
              <div className="mt-3 flex justify-evenly items-center gap-3">
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-6 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Analyzing...
                    </span>
                  ) : step < questions.length - 1 ? "Next Question →" : "Get Diagnosis"}
                </button>

                {step <= questions.length && (
                  <button
                    onClick={() => {
                      contactSpecialist();
                      saveResponse();
                    }}
                    className="flex-1 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Contact Specialist
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <p className="text-xs text-gray-500 text-center">
              {step + 1} of {questions.length} questions answered
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
