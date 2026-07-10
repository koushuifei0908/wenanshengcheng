"use client";

import { useState } from "react";
import type { ChatMessage } from "@/core/chat";
import { CopyIcon } from "./icons";

interface MessageItemProps {
  message: ChatMessage;
  isStreaming: boolean;
}

export function MessageItem({ message, isStreaming }: MessageItemProps) {
  const [copied, setCopied] = useState(false);
  const copyContent = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <article className={`message message--${message.role} message-enter`}>
      <div className="message__label">{message.role === "user" ? "你" : "文案生产"}</div>
      <div className="message__content">
        {message.content || <span className="thinking">正在构思</span>}
        {isStreaming && message.content && <span className="stream-caret" aria-hidden="true" />}
      </div>
      {message.role === "assistant" && message.content && (
        <button className="copy-button" type="button" onClick={copyContent} aria-label="复制回答">
          <CopyIcon />{copied ? "已复制" : "复制"}
        </button>
      )}
      <span className="sr-only" aria-live="polite">{copied ? "内容已复制" : ""}</span>
    </article>
  );
}
