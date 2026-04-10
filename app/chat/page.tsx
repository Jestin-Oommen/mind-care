"use client";

import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // load sessions on start
  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    const res = await fetch("/api/sessions");
    const data = await res.json();
    setSessions(data);
  }

  // create new session
  async function createSession() {
  const res = await fetch("/api/session", { method: "POST" });
  const data = await res.json();

  console.log("SESSION RESPONSE:", data); // 👈 ADD THIS LINE

  if (!data.sessionId) {
    alert("Session creation failed");
    return;
  }

  setSessionId(data.sessionId);
  setMessages([]);

  fetchSessions();
}

  // load messages
  async function loadMessages(id: string) {
    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ sessionId: id }),
    });

    const data = await res.json();

    setSessionId(id);
    setMessages(data);
  }

  // send message
  async function sendMessage() {
    if (!message.trim() || !sessionId) return;

    const userMessage = { role: "user", text: message };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          message,
          sessionId, // ✅ IMPORTANT
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
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <div className="w-64 border-r p-4 space-y-3">
        <button
          onClick={createSession}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          + New Chat
        </button>

        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => loadMessages(s.id)}
            className={`p-2 rounded cursor-pointer ${
              s.id === sessionId ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            Chat {s.id.slice(-4)}
          </div>
        ))}
      </div>

      {/* MAIN CHAT */}
      <div className="flex flex-col flex-1 max-w-3xl mx-auto p-4">

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
            placeholder={
              sessionId ? "Talk to AI..." : "Create a new chat first"
            }
            className="flex-1 border p-2 rounded-lg"
            disabled={!sessionId}
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
    </div>
  );
}