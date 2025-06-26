import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

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
        <div className="mt-3">
          <button
            onClick={() => setShowThink(!showThink)}
            className="text-xs text-emerald-600 hover:text-emerald-800 transition-colors duration-200 font-medium"
          >
            {showThink ? "Hide thought process" : "Show thought process"}
          </button>

          {showThink && (
            <div className="mt-2 p-4 bg-emerald-50 rounded-lg text-emerald-800 text-xs max-h-48 overflow-y-auto whitespace-pre-wrap border border-emerald-200 font-mono">
              {thinkText}
            </div>
          )}
        </div>
      )}

      <div className="whitespace-pre-wrap text-emerald-900 leading-relaxed">
        {answerText}
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-start">
      <div className="p-3 bg-emerald-100 rounded-lg max-w-[70%]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <span className="text-emerald-600 text-sm">Loading...</span>
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center p-6 max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Hello! I'm <span className="text-emerald-600">ChatFine</span></h3>
        <p className="text-gray-600 text-sm">
          Your AI assistant for financial analysis. Ask me anything about financial reports,
          ratios, or other financial topics.
        </p>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [inputMessage]);

  function convertMessagesToHistory(messages: Message[]) {
    return messages.map((msg) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    }));
  }

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();

    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputMessage("");
    setLoading(true);

    try {
      const currentMessages = [...messages, { text: userMessage, isBot: false }];
      const history = convertMessagesToHistory(currentMessages);

      const response = await fetch("https://backend-ai-financial-report-50598077190.asia-southeast1.run.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage, history }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.jawaban, isBot: true },
      ]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Terjadi kesalahan saat menghubungi server.", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden flex flex-col h-[90vh] relative shadow-lg"> {/* Added shadow for depth */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 relative scroll-smooth scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-100"> {/* Added scrollbar styles */}
        {messages.length === 0 && <WelcomeMessage />}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`p-3 text-sm rounded-xl max-w-full md:max-w-[75%] shadow-sm ${
                msg.isBot
                  ? "bg-emerald-100 text-emerald-900 rounded-bl-none"
                  : "bg-white text-gray-800 border border-emerald-300 rounded-br-none"
              }`}
            >
              {msg.isBot ? <BotMessage text={msg.text} /> : msg.text}
            </div>
          </div>
        ))}

        {loading && <LoadingSpinner />}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto bg-white border-t border-gray-200 p-4"> {/* Increased padding for input area */}
        <div className="flex gap-3 items-end px-4 py-3 border-2 border-emerald-400 rounded-xl focus-within:border-emerald-600 transition-colors duration-200"> {/* Adjusted padding, added focus style */}
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg focus:outline-none text-base resize-none max-h-96 transition-all duration-100 placeholder-gray-500" // Adjusted text size, placeholder color
            placeholder="Type your message..."
            disabled={loading}
            rows={1}
            style={{
              minHeight: "48px", // Slightly increased min-height
              overflowY: "hidden",
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !inputMessage.trim()}
            className={`p-3 h-12 w-12 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base ${
              loading || !inputMessage.trim()
                ? "bg-emerald-200 text-white cursor-not-allowed" // Adjusted disabled button color
                : "bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
            }`}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
}