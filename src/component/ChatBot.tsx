import { FaArrowUp, FaCheck} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { MdContentCopy } from "react-icons/md";

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
  const [copied, setCopied] = useState(false);

  const preprocessMath = (text: string) => {
    return text
      .replace(/\\\[/g, '$$')
      .replace(/\\\]/g, '$$');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(answerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 detik animasi
  };

  return (
    <div className="relative">
      {thinkText && (
        <div className="mt-3">
          <button
            onClick={() => setShowThink(!showThink)}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
          >
            {showThink ? "Hide thought process" : "Show thought process"}
          </button>
          {showThink && (
            <div className="mt-2 p-4 bg-emerald-50 rounded-lg text-emerald-800 text-xs max-h-48 overflow-y-auto whitespace-pre-wrap border border-emerald-200 font-mono">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {preprocessMath(thinkText)}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}

      <div className="relative text-emerald-900 leading-relaxed prose prose-emerald max-w-none mt-2">
        <button
          onClick={handleCopy}
          className="flex items-center absolute p-1  rounded   hover:bg-gray-300 -top-5 right-2 text-lg hover:text-emerald-800 cursor-pointer transition-colors duration-200"
          title="Copy answer"
        >
          {copied ? <FaCheck className="text-green-800" /> :<MdContentCopy />}
        </button>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {preprocessMath(answerText)}
        </ReactMarkdown>
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
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputMessage]);

  const convertMessagesToHistory = (messages: Message[]) =>
    messages.map((msg) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    }));

  const handleSend = async () => {
    if (!inputMessage.trim() || loading) return;

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

      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.jawaban, isBot: true }]);
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
    <div className="max-w-4xl mx-auto overflow-hidden flex flex-col h-[85vh] relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 relative scroll-smooth scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-100 hide-scrollbar">
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

      <div className="mt-auto border-gray-200">
        <div className="flex gap-3 items-end px-4 py-3 border-2 border-emerald-400 rounded-xl focus-within:border-emerald-600 transition-colors duration-200">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg focus:outline-none text-base resize-none max-h-96 transition-all duration-100 placeholder-gray-500"
            placeholder="Type your message..."
            rows={1}
            style={{
              minHeight: "48px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          />
          <button
            onClick={handleSend}
            className={`p-3 h-12 w-12 flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base
              ${!inputMessage.trim()
                ? "bg-emerald-200 text-white cursor-not-allowed"
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
