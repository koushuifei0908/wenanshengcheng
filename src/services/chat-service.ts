import { z } from "zod";
import { SYSTEM_PROMPT, type ChatRequest } from "@/core/chat";
import { AppError } from "@/core/errors";
import { streamArkCompletion } from "@/adapters/ark-client";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(20_000),
});

const requestSchema = z.object({ messages: z.array(messageSchema).min(1).max(40) });

export function parseChatRequest(value: unknown): ChatRequest {
  const result = requestSchema.safeParse(value);
  if (!result.success) {
    throw new AppError("INVALID_REQUEST", "消息内容无效，请检查后重试", {}, 400);
  }
  return { messages: [{ role: "system", content: SYSTEM_PROMPT }, ...result.data.messages] };
}

export async function createChatStream(value: unknown): Promise<Response> {
  return streamArkCompletion(parseChatRequest(value));
}
