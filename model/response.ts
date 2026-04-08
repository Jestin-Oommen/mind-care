export function generateResponse(emotion: string, intent: string) {

  const responses: any = {

    sad: {
      general: "I'm really sorry you're feeling this way. Do you want to talk about what's bothering you?",
      loneliness: "Feeling alone can be really heavy. I'm here with you."
    },

    anxious: {
      stress: "Let's slow things down together. Try a deep breath in... and out.",
      general: "It sounds like you're feeling anxious. What's on your mind?"
    },

    angry: {
      general: "I can sense some frustration. Want to tell me what happened?"
    },

    happy: {
      general: "That's great to hear! What made you feel this way?"
    }

  };

  return responses?.[emotion]?.[intent] ||
         "I'm here to listen. Tell me more.";
}