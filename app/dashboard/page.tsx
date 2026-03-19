"use client";
import { getMoods, getSessions } from "@/lib/storage";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Activity,
  Trophy,
  Bell,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [stats, setStats] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    setMounted(true);

    const moods = getMoods();
    const sessions = getSessions();

    // 📊 Calculate Mood Average
    const avgMood =
      moods.length > 0
        ? Math.round(
            moods.reduce((acc, m) => acc + m.value, 0) / moods.length
          )
        : 0;

    // 📊 Stats (REAL DATA)
    setStats([
      {
        title: "Mood Score",
        value: avgMood ? `${avgMood}%` : "No data",
        icon: Brain,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        desc: "Average mood",
      },
      {
        title: "Completion",
        value: "100%",
        icon: Trophy,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        desc: "Daily goal",
      },
      {
        title: "Therapy",
        value: `${sessions.length} sessions`,
        icon: Heart,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        desc: "Total sessions",
      },
      {
        title: "Activities",
        value: moods.length.toString(),
        icon: Activity,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        desc: "Mood logs",
      },
    ]);

    // 🧠 INSIGHTS LOGIC
    const newInsights = [];

    if (moods.length > 0) {
      const latest = moods[moods.length - 1].value;

      if (latest > avgMood) {
        newInsights.push({
          title: "Mood Improving 📈",
          description:
            "Your recent mood is better than your overall average.",
        });
      } else {
        newInsights.push({
          title: "Mood Drop ⚠️",
          description:
            "Your mood dropped slightly. Consider relaxation exercises.",
        });
      }

      if (moods.length >= 5) {
        newInsights.push({
          title: "Consistency 🔥",
          description:
            "You're regularly tracking your mood. Keep it up!",
        });
      }

      if (avgMood > 70) {
        newInsights.push({
          title: "Healthy State 🌿",
          description:
            "You are maintaining a positive mental state.",
        });
      }
    }

    if (sessions.length >= 3) {
      newInsights.push({
        title: "Therapy Progress 💬",
        description:
          "You're actively engaging in therapy sessions. Great progress!",
      });
    }

    setInsights(newInsights);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background mt-20 px-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}

        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold">
              Welcome back 👋
            </h1>
            <p className="text-muted-foreground">
              Track your mental wellness
            </p>
          </motion.div>

          <Button variant="outline" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* TOP GRID */}

        <div className="grid md:grid-cols-3 gap-4">

          {/* QUICK ACTIONS */}

          <Card className="relative overflow-hidden border-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Start your session
                  </p>
                </div>
              </div>

              <Button
                className="w-full justify-between bg-primary text-white"
                onClick={() => router.push("/chat")}
              >
                Start Therapy
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* OVERVIEW */}

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Today's Overview</CardTitle>
              <CardDescription>
                Your mental health stats
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={i} className={cn("p-4 rounded-lg", s.bg)}>
                  <div className="flex items-center gap-2">
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                    <p className="text-sm">{s.title}</p>
                  </div>

                  <p className="text-xl font-bold mt-2">
                    {s.value}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* INSIGHTS */}

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>
              Personalized recommendations
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {insights.length > 0 ? (
              insights.map((insight, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-muted hover:bg-muted/70 transition"
                >
                  <p className="font-medium">{insight.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No insights yet. Start using the app to see analytics.
              </p>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}