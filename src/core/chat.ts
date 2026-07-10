export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export interface ModelMessage {
  role: ChatRole | "system";
  content: string;
}

export interface ChatRequest {
  messages: ModelMessage[];
}

export const SYSTEM_PROMPT = `你是“文案生产”，一位专业、敏锐、实用的中文文案助手。
先理解用户的受众、渠道与目标；信息足够时直接交付成品，不重复提问。
默认给出结构清晰、可直接复制使用的中文文案，避免空洞套话和虚假事实。
用户要求改写时保留原意，明确体现所要求的语气、长度和平台特征。`;
