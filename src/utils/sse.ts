interface ArkDelta {
  choices?: Array<{ delta?: { content?: string }; finish_reason?: string | null }>;
}

interface ParsedSseEvent {
  content: string;
  isComplete: boolean;
}

export function extractSseContent(buffer: string): { content: string; rest: string; isComplete: boolean } {
  const events = buffer.replace(/\r\n/g, "\n").split("\n\n");
  const rest = events.pop() ?? "";
  const parsedEvents = events.map(parseSseEvent);
  return {
    content: parsedEvents.map((event) => event.content).join(""),
    rest,
    isComplete: parsedEvents.some((event) => event.isComplete),
  };
}

function parseSseEvent(event: string): ParsedSseEvent {
  const dataLine = event.split("\n").find((line) => line.startsWith("data:"));
  const payload = dataLine?.slice(5).trim();
  if (!payload) return { content: "", isComplete: false };
  if (payload === "[DONE]") return { content: "", isComplete: true };
  try {
    const parsed = JSON.parse(payload) as ArkDelta;
    const choice = parsed.choices?.[0];
    return {
      content: choice?.delta?.content ?? "",
      isComplete: Boolean(choice?.finish_reason),
    };
  } catch {
    return { content: "", isComplete: false };
  }
}
