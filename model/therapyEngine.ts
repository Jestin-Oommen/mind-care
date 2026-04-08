import { detectEmotion } from "./emotions";
import { detectIntent } from "./intent";
import { detectCrisis } from "./intent";
import { generateResponse } from "./response";

export function therapyEngine(message: string) {

  if (detectCrisis(message)) {
    return {
      type: "crisis",
      reply: "I'm really sorry you're feeling this way. Please reach out to a trusted person or helpline immediately."
    };
  }

  const emotion = detectEmotion(message);
  const intent = detectIntent(message);

  const reply = generateResponse(emotion, intent);

  return {
    type: "normal",
    emotion,
    intent,
    reply
  };
}