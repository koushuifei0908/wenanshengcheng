import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文案生产 · AI 文案工作台",
  description: "把想法交给 AI，快速生成更有说服力的中文文案。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
