"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Shield,
  Fingerprint,
  Activity,
  Bot,
  LineChart,
  Wifi,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "AI-Powered Therapy",
    description:
      "24/7 access to empathetic AI support that understands your emotions and responds with care.",
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Secure & Private",
    description:
      "Your conversations are protected with strong security and complete privacy.",
  },
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "Smart Emotional Analysis",
    description:
      "AI detects patterns in your mood and helps you understand your mental state better.",
  },
  {
    icon: <Activity className="w-8 h-8 text-primary" />,
    title: "Real-time Support",
    description:
      "Instant responses when you need help the most — no waiting, no judgment.",
  },
  {
    icon: <Wifi className="w-8 h-8 text-primary" />,
    title: "Always Available",
    description:
      "Access your AI therapist anytime, anywhere — day or night.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: "Progress Tracking",
    description:
      "Track your mood and see how your mental health evolves over time.",
  },
  {
    icon: <Fingerprint className="w-8 h-8 text-primary" />,
    title: "User Control",
    description:
      "You own your data. Full control, no compromises.",
  },
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Human-Centered Design",
    description:
      "Built with empathy to make conversations feel natural and supportive.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-24">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold mb-6">
            Platform Features
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a smarter, more supportive mental health experience.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="
                p-6 h-full rounded-2xl
                border border-white/10
                bg-card/40 backdrop-blur-xl
                hover:border-primary/30
                hover:shadow-lg hover:shadow-primary/10
                transition-all duration-300
              ">
                <div className="mb-4">{feature.icon}</div>

                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Ready to start your journey?
          </h2>

          <p className="text-muted-foreground mb-6">
            Talk to your AI therapist and begin improving your mental well-being.
          </p>

          <a
            href="/chat"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-xl
              bg-primary text-primary-foreground
              hover:bg-primary/90
              transition
            "
          >
            Start Chatting
            <Heart className="w-5 h-5" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}