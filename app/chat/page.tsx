"use client";

import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    const res = await fetch("/api/sessions");
    const data = await res.json();
    setSessions(data);
  }

  async function createSession() {
    const res = await fetch("/api/session", { method: "POST" });
    const data = await res.json();

    console.log("SESSION RESPONSE:", data);

    if (!data.sessionId) {
      alert("Session creation failed");
      return;
    }

    setSessionId(data.sessionId);
    setMessages([]);
    fetchSessions();
  }

  async function loadMessages(id: string) {
    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ sessionId: id }),
    });

    const data = await res.json();

    setSessionId(id);
    setMessages(data);
  }

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
          sessionId,
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
    <div className="flex h-screen bg-background text-foreground">

      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-4 space-y-3 bg-card/40 backdrop-blur-xl">

        <button
          onClick={createSession}
          className="w-full bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 transition"
        >
          + New Chat
        </button>

        <div className="space-y-2 mt-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => loadMessages(s.id)}
              className={`p-2 rounded-lg cursor-pointer text-sm transition ${
                s.id === sessionId
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-white/5"
              }`}
            >
              Chat {s.id.slice(-4)}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT */}
      <div className="flex flex-col flex-1 max-w-4xl mx-auto p-4">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-4 text-center">
          🧠 AI Therapist
        </h1>

        {/* CHAT AREA */}
        <div className="
          flex-1 overflow-y-auto space-y-4 p-4
          border border-white/10
          rounded-xl
          bg-card/40 backdrop-blur-xl
        ">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                  px-4 py-2 rounded-2xl max-w-[70%] text-sm
                  ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/10 text-foreground"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm text-muted-foreground">
              AI is typing...
            </div>
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
            className="
              flex-1 p-3 rounded-xl
              bg-card/40 backdrop-blur-xl
              border border-white/10
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
            disabled={!sessionId}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            className="
              px-5 rounded-xl
              bg-primary text-primary-foreground
              hover:bg-primary/90 transition
            "
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}