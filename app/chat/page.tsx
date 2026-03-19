"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = { role: "user", text: message };

    // ✅ include latest message in history
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message,
          history: updatedMessages,
        }),
      });

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-4 text-center">
        🧠 AI Therapist
      </h1>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-4 p-3 border rounded-lg bg-gray-50">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing Loader */}
        {loading && (
          <div className="text-gray-500 text-sm">AI is typing...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Talk to AI..."
          className="flex-1 border p-2 rounded-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}