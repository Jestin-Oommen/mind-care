"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Loader2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { saveSession } from "@/lib/storage";

export default function ChatPage() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggested = [
    "I feel stressed about exams",
    "I feel lonely",
    "I am anxious about future",
    "How can I improve my mood?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  saveSession(); // save when chat page loads
}, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // TEMP AI RESPONSE (we replace later with model)
  const fakeAI = (msg: string) => {
    if (msg.toLowerCase().includes("stress"))
      return "It sounds like you're feeling stressed. Try taking a short break and focus on your breathing.";

    if (msg.toLowerCase().includes("sad"))
      return "I'm here for you. Do you want to talk about what's making you feel sad?";

    return "I'm here to listen. Tell me more.";
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        role: "assistant",
        content: fakeAI(message),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 flex h-[80vh] border rounded-lg overflow-hidden">

      {/* Sidebar */}

      <div className="w-64 border-r bg-muted/30 p-4">
        <h2 className="font-semibold mb-4">Chats</h2>

        <Button className="w-full mb-4">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Chat
        </Button>

        <div className="text-sm text-muted-foreground">
          No history yet
        </div>
      </div>

      {/* Chat Area */}

      <div className="flex-1 flex flex-col">

        {/* Header */}

        <div className="p-4 border-b flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <span className="font-semibold">AI Therapist</span>
        </div>

        {/* Messages */}

        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">

            <div className="space-y-4 text-center">

              <h2 className="text-xl font-semibold">
                How can I help you today?
              </h2>

              <div className="space-y-2">

                {suggested.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => setMessage(q)}
                  >
                    {q}
                  </Button>
                ))}

              </div>

            </div>

          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >

                {msg.role === "assistant" && (
                  <Bot className="w-5 h-5 mt-1 text-primary" />
                )}

                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === "user" && (
                  <User className="w-5 h-5 mt-1" />
                )}

              </motion.div>

            ))}

            {isTyping && (
              <div className="flex gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm text-muted-foreground">
                  AI is typing...
                </p>
              </div>
            )}

            <div ref={messagesEndRef} />

          </div>
        )}

        {/* Input */}

        <div className="p-4 border-t flex gap-2">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type your message..."
          />

          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>

        </div>

      </div>

    </div>
  );
}