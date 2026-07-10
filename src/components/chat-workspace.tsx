"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { MenuIcon, PenIcon, PlusIcon, SendIcon, StopIcon } from "./icons";
import { MessageItem } from "./message-item";

const SUGGESTIONS = [
  "写一段小红书产品种草文案",
  "生成 10 个抓眼球的短视频标题",
  "把这段文字改得更有说服力",
  "写一条有温度的朋友圈文案",
];

export function ChatWorkspace() {
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, isGenerating, error, sendMessage, clearMessages, stopGeneration } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitMessage = async (value: string) => {
    const content = value.trim();
    if (!content || isGenerating) return;
    setInput("");
    await sendMessage(content);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submitMessage(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  };

  return (
    <main className="app-shell app-enter">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onNewChat={clearMessages} />
      <section className="workspace">
        <header className="mobile-header">
          <button className="icon-button" onClick={() => setSidebarOpen(true)} aria-label="打开菜单"><MenuIcon /></button>
          <Brand compact />
          <button className="icon-button" onClick={clearMessages} aria-label="新建对话"><PlusIcon /></button>
        </header>
        <div className="conversation">
          {messages.length === 0 ? <EmptyState onSelect={submitMessage} /> : (
            <div className="message-list">
              {messages.map((message, index) => (
                <MessageItem key={message.id} message={message} isStreaming={isGenerating && index === messages.length - 1} />
              ))}
            </div>
          )}
          {error && <div className="error-banner" role="alert">{error}</div>}
          <div ref={bottomRef} />
        </div>
        <Composer {...{ input, setInput, isGenerating, handleSubmit, handleKeyDown, stopGeneration }} />
      </section>
    </main>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? "brand--compact" : ""}`}><span className="brand__mark"><PenIcon /></span><span>文案生产</span></div>;
}

function Sidebar({ isOpen, onClose, onNewChat }: { isOpen: boolean; onClose: () => void; onNewChat: () => void }) {
  return <>
    <aside className="sidebar" data-open={isOpen}>
      <Brand />
      <button className="new-chat" onClick={() => { onNewChat(); onClose(); }}><PlusIcon />新建对话</button>
      <div className="sidebar__section"><span className="eyebrow">今天</span><button className="sidebar-item" aria-current="page">新的创作</button></div>
      <p className="sidebar__note">让每个想法，都有更好的表达。</p>
    </aside>
    {isOpen && <button className="sidebar-overlay" onClick={onClose} aria-label="关闭菜单" />}
  </>;
}

function EmptyState({ onSelect }: { onSelect: (value: string) => Promise<void> }) {
  return <div className="empty-state">
    <div className="eyebrow">AI 文案工作台</div>
    <h1>今天，想写点什么？</h1>
    <p>说出你的想法、受众和使用场景，我会帮你把它变成更有力量的文字。</p>
    <div className="suggestions">{SUGGESTIONS.map((item) => <button className="tag" key={item} onClick={() => void onSelect(item)}>{item}</button>)}</div>
  </div>;
}

interface ComposerProps {
  input: string;
  setInput: (value: string) => void;
  isGenerating: boolean;
  handleSubmit: (event: FormEvent) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  stopGeneration: () => void;
}

function Composer({ input, setInput, isGenerating, handleSubmit, handleKeyDown, stopGeneration }: ComposerProps) {
  return <div className="composer-wrap"><form className="composer" onSubmit={handleSubmit}>
    <textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder="描述你想要的文案……" rows={1} disabled={isGenerating} aria-label="输入消息" />
    {isGenerating
      ? <button className="send-button" type="button" onClick={stopGeneration} aria-label="停止生成"><StopIcon /></button>
      : <button className="send-button" type="submit" disabled={!input.trim()} aria-label="发送消息"><SendIcon /></button>}
    <span className="composer__hint">Enter 发送 · Shift + Enter 换行</span>
  </form><p className="disclaimer">AI 生成内容可能存在偏差，请在使用前核对重要信息。</p></div>;
}
