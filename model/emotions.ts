const emotionKeywords = {
  sad: ["sad", "down", "depressed", "unhappy", "cry"],
  anxious: ["anxious", "nervous", "panic", "worried"],
  angry: ["angry", "mad", "frustrated"],
  happy: ["happy", "good", "great", "excited"]
} as const;

// Create type from keys
type Emotion = keyof typeof emotionKeywords;

export function detectEmotion(text: string): Emotion {
  const lower = text.toLowerCase();

  let scores: Record<Emotion, number> = {
    sad: 0,
    anxious: 0,
    angry: 0,
    happy: 0
  };

  for (const emotion of Object.keys(emotionKeywords) as Emotion[]) {
    scores[emotion] = emotionKeywords[emotion].filter(word =>
      lower.includes(word)
    ).length;
  }

  return Object.keys(scores).reduce((a, b) =>
    scores[a as Emotion] > scores[b as Emotion] ? a : b
  ) as Emotion;
}