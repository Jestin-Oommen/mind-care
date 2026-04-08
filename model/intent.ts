export function detectIntent(text: string) {
  const lower = text.toLowerCase();

  if (lower.includes("help")) return "support";
  if (lower.includes("stress")) return "stress";
  if (lower.includes("sleep")) return "sleep";
  if (lower.includes("alone")) return "loneliness";

  return "general";
}

export function detectCrisis(text: string) {
  const keywords = [
    "suicide",
    "kill myself",
    "want to die",
    "end my life"
  ];

  return keywords.some(k => text.toLowerCase().includes(k));
}