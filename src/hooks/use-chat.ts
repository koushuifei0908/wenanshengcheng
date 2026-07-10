"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "@/core/chat";
import { extractSseContent } from "@/utils/sse";

const createMessage = (role: ChatMessage["role"], content: string): ChatMessage => ({
  id: crypto.randomUUID(), role, content,
});

async function readError(response: Response): Promise<string> {
  const fallback = "生成失败了，请稍后重试";
  try {
    const body = await response.json() as { error?: { message?: string } };
    return body.error?.message || fallback;
  } catch {
    return fallback;
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const updateAssistant = useCallback((id: string, content: string) => {
    setMessages((current) => current.map((message) => message.id === id ? { ...message, content } : message));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage = createMessage("user", content);
    const assistantMessage = createMessage("assistant", "");
    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, assistantMessage]);
    setError("");
    setIsGenerating(true);
    abortRef.current = new AbortController();
    try {
      await streamResponse(nextMessages, assistantMessage.id, abortRef.current.signal, updateAssistant);
    } catch (caught) {
      if ((caught as Error).name !== "AbortError") setError((caught as Error).message);
    } finally {
      setIsGenerating(false);
      abortRef.current = null;
    }
  }, [messages, updateAssistant]);

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError("");
  }, []);

  return { messages, isGenerating, error, sendMessage, clearMessages, stopGeneration: () => abortRef.current?.abort() };
}

async function streamResponse(
  messages: ChatMessage[], assistantId: string, signal: AbortSignal,
  updateAssistant: (id: string, content: string) => void,
): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" }, signal,
    body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
  });
  if (!response.ok) throw new Error(await readError(response));
  if (!response.body) throw new Error("模型没有返回内容，请重试");
  await consumeStream(response.body, (content) => updateAssistant(assistantId, content));
}

async function consumeStream(stream: ReadableStream<Uint8Array>, onContent: (content: string) => void): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  let isComplete = false;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parsed = extractSseContent(buffer);
    buffer = parsed.rest;
    content += parsed.content;
    isComplete ||= parsed.isComplete;
    onContent(content);
  }
  if (!isComplete) throw new Error("生成意外中断，当前内容可能不完整，请重新发送或缩短要求");
}
