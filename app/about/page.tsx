"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Target, Sparkles, Brain, Shield, Activity } from "lucide-react";

const missions = [
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Our Mission",
    description:
      "We aim to make mental health support accessible to everyone. Whether you're feeling anxious, overwhelmed, or just need someone to talk to, MindCare is always there — judgment-free and available anytime.",
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Our Vision",
    description:
      "We envision a world where mental well-being is treated with the same importance as physical health — supported by intelligent systems that truly understand and adapt to each individual.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Our Values",
    description:
      "Empathy first. Privacy always. Innovation with purpose. We build technology that respects users while genuinely helping them grow emotionally.",
  },
];

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "AI Emotional Support",
    description:
      "Chat with an AI therapist that listens, understands your emotions, and responds with empathy.",
  },
  {
    icon: <Activity className="w-6 h-6 text-primary" />,
    title: "Mood Tracking",
    description:
      "Automatically track your emotional patterns and visualize your mental health journey over time.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Privacy Focused",
    description:
      "Your conversations stay secure. We prioritize your privacy and give you full control over your data.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          About MindCare
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          MindCare is your personal AI therapist — designed to support you through
          stress, anxiety, and everyday challenges. It's not just a chatbot,
          it's a space where you can reflect, express, and grow.
        </p>
      </motion.div>

      {/* MISSION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 text-center h-full bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mb-4 flex justify-center">{mission.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-muted-foreground">{mission.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FEATURES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <h2 className="text-2xl font-semibold text-center mb-10">
          What Makes MindCare Different
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="p-5">
              <div className="mb-3">{feature.icon}</div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Start your journey today
        </h2>
        <p className="text-muted-foreground mb-6">
          Talk to MindCare, track your mood, and take small steps towards a better
          mental state.
        </p>

        <a
          href="/chat"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Start Chatting
        </a>
      </motion.div>
    </div>
  );
}