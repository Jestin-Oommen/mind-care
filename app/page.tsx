"use client";
import { saveMood } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  HeartPulse,
  Lightbulb,
  Lock,
  MessageSquareHeart,
  Waves,
  Sparkles,
  Brain,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const emotions = [
    { value: 0, label: "😔 Down", color: "from-blue-500/50" },
    { value: 25, label: "😊 Content", color: "from-green-500/50" },
    { value: 50, label: "😌 Peaceful", color: "from-purple-500/50" },
    { value: 75, label: "🤗 Happy", color: "from-yellow-500/50" },
    { value: 100, label: "✨ Excited", color: "from-pink-500/50" },
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  const welcomeSteps = [
    {
      title: "Hi, I'm Aura 👋",
      description:
        "Your AI companion for emotional well-being. I'm here to provide a safe space for you.",
      icon: Waves,
    },
    {
      title: "Personalized Support 🌱",
      description:
        "I adapt to your emotions and provide helpful suggestions for better mental health.",
      icon: Brain,
    },
    {
      title: "Your Privacy Matters 🛡️",
      description:
        "Your conversations remain private and secure at all times.",
      icon: Shield,
    },
  ];

  const features = [
    {
      icon: HeartPulse,
      title: "24/7 Support",
      description: "Always here to listen and support you",
      color: "from-rose-500/20",
    },
    {
      icon: Lightbulb,
      title: "Smart Insights",
      description: "AI powered emotional guidance",
      color: "from-amber-500/20",
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "Your data is safe and confidential",
      color: "from-emerald-500/20",
    },
    {
      icon: MessageSquareHeart,
      title: "Evidence-Based",
      description: "Therapy methods backed by research",
      color: "from-blue-500/20",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}

      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 text-center">

        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-3xl -top-20 -left-20
          bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1 }}
          className="space-y-6 max-w-2xl"
        >

          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm border border-primary/20 bg-primary/5">
            <Waves className="w-4 h-4 text-primary animate-pulse"/>
            AI Mental Health Companion
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">
            Find Peace
            <br />
            of Mind
          </h1>

          <p className="text-muted-foreground text-lg">
            Talk with an AI companion designed to support your emotional well-being.
          </p>

          {/* Emotion slider */}

          <div className="space-y-6 py-6">

            <div className="flex justify-between text-sm">
              {emotions.map((em) => (
                <div
                  key={em.value}
                  className={`cursor-pointer ${
                    Math.abs(emotion - em.value) < 15 ? "scale-110" : "opacity-50"
                  }`}
                  onClick={() => setEmotion(em.value)}
                >
                  {em.label}
                </div>
              ))}
            </div>

            <Slider
              value={[emotion]}
              onValueChange={(v) => setEmotion(v[0])}
              min={0}
              max={100}
            />

          </div>

          <Button
  size="lg"
  onClick={() => {
    saveMood(emotion);   // ✅ SAVE MOOD HERE
    setShowDialog(true); // open dialog
  }}
  className="rounded-full px-8"
>
  Begin Your Journey
  <ArrowRight className="ml-2 w-4 h-4"/>
</Button>
            

        </motion.div>
      </section>

      {/* FEATURES SECTION */}

      <section className="py-20 px-4">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How Aura Helps You</h2>
            <p className="text-muted-foreground mt-2">
              AI powered emotional support anytime
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {features.map((feature, i) => (
              <Card key={i} className="group">

                <CardHeader>
                  <feature.icon className="w-6 h-6 text-primary"/>
                  <h3 className="font-semibold mt-2">{feature.title}</h3>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>

              </Card>
            ))}

          </div>

        </div>

      </section>

      {/* WELCOME DIALOG */}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>

        <DialogContent>

          <DialogHeader>

            <DialogTitle className="text-center">
              {welcomeSteps[currentStep].title}
            </DialogTitle>

            <DialogDescription className="text-center">
              {welcomeSteps[currentStep].description}
            </DialogDescription>

          </DialogHeader>

          <div className="flex justify-end mt-6">

            <Button
              onClick={() => {

                if (currentStep < welcomeSteps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  router.push("/chat");
                }

              }}
            >

              {currentStep === welcomeSteps.length - 1
                ? "Let's Begin"
                : "Next"}

              {currentStep === welcomeSteps.length - 1
                ? <Sparkles className="ml-2 w-4 h-4"/>
                : <ArrowRight className="ml-2 w-4 h-4"/>}

            </Button>

          </div>

        </DialogContent>

      </Dialog>

    </div>
  );
}