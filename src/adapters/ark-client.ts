import { AppError } from "@/core/errors";
import type { ChatRequest } from "@/core/chat";

const DEFAULT_API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
const DEFAULT_MODEL_ID = "ep-m-20260704212204-cqqj7";
const REQUEST_TIMEOUT_MS = 240_000;

interface ArkConfig {
  apiKey: string;
  apiUrl: string;
  modelId: string;
}

function readArkConfig(): ArkConfig {
  const apiKey = process.env.ARK_API_KEY?.trim();
  if (!apiKey) throw new AppError("CONFIG_MISSING", "模型服务尚未配置", {}, 503);
  return {
    apiKey,
    apiUrl: process.env.ARK_API_URL?.trim() || DEFAULT_API_URL,
    modelId: process.env.ARK_MODEL_ID?.trim() || DEFAULT_MODEL_ID,
  };
}

function createRequestInit(request: ChatRequest, config: ArkConfig): RequestInit {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({ model: config.modelId, messages: request.messages, stream: true }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  };
}

export async function streamArkCompletion(request: ChatRequest): Promise<Response> {
  const config = readArkConfig();
  const response = await fetch(config.apiUrl, createRequestInit(request, config));
  if (!response.ok || !response.body) {
    throw new AppError("UPSTREAM_ERROR", "模型暂时没有响应，请稍后重试", { status: response.status }, 502);
  }
  return response;
}
