import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface Message {
  text: string;
  isBot: boolean;
}

function parseBotResponse(text: string) {
  const thinkRegex = /<think>([\s\S]*?)<\/think>/i;
  const thinkMatch = text.match(thinkRegex);
  let thinkText = "";
  let answerText = text;

  if (thinkMatch) {
    thinkText = thinkMatch[1].trim();
    answerText = text.replace(thinkRegex, "").trim();
  }

  return { thinkText, answerText };
}

function BotMessage({ text }: { text: string }) {
  const { thinkText, answerText } = parseBotResponse(text);
  const [showThink, setShowThink] = useState(false);

  return (
    <div>
      {thinkText && (
        <div className="mt-2">
          <button
            onClick={() => setShowThink(!showThink)}
            className="text-xs text-gray-500 underline hover:text-gray-700 focus:outline-none"
          >
            {showThink ? "Sembunyikan proses berpikir" : "Lihat proses berpikir"}
          </button>

          {showThink && (
            <pre
              className="mt-1 p-3 bg-gray-100 rounded-md text-gray-700 text-xs max-h-48 overflow-y-auto whitespace-pre-wrap border border-gray-300"
              style={{ fontFamily: "monospace" }}
            >
              {thinkText}
            </pre>
          )}
        </div>
      )}

      <p className="whitespace-pre-wrap text-gray-900 text-base mt-2">
        {answerText}
      </p>
    </div>

  );
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://backend-ai-financial-report-50598077190.asia-southeast1.run.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await response.json();

      if (data && data.jawaban) {
        setMessages((prev) => [...prev, { text: data.jawaban, isBot: true }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { text: data.error, isBot: true }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Bot tidak bisa memberikan jawaban.", isBot: true },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Terjadi kesalahan saat menghubungi server.", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-7 max-w-full mx-auto bg-white rounded-xl overflow-hidden flex flex-col h-[90vh]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[70%] text-sm md:text-base shadow-sm ${msg.isBot
                ? "bg-gray-200 text-gray-900 rounded-bl-none"
                : "bg-white text-gray-900 border border-gray-300 rounded-br-none"
                }`}
            >
              {msg.isBot ? <BotMessage text={msg.text} /> : msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-3 bg-gray-200 text-gray-600 rounded-lg max-w-[70%] text-sm md:text-base italic">
              Bot sedang mengetik<span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>


      {/* Input and Send Button */}
      <div className="mt-auto p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            placeholder="Message ChatFine..."
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}
