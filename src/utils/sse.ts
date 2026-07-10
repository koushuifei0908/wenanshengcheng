interface ArkDelta {
  choices?: Array<{ delta?: { content?: string } }>;
}

export function extractSseContent(buffer: string): { content: string; rest: string } {
  const events = buffer.split("\n\n");
  const rest = events.pop() ?? "";
  return { content: events.map(parseSseEvent).join(""), rest };
}

function parseSseEvent(event: string): string {
  const dataLine = event.split("\n").find((line) => line.startsWith("data:"));
  const payload = dataLine?.slice(5).trim();
  if (!payload || payload === "[DONE]") return "";
  try {
    const parsed = JSON.parse(payload) as ArkDelta;
    return parsed.choices?.[0]?.delta?.content ?? "";
  } catch {
    return "";
  }
}
