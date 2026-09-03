import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DocuBrain — Корпоративный AI-ассистент по регламентам без риска утечки данных",
  description:
    "RAG-бот для онбординга и регламентов в Slack и Telegram. Точные ответы строго по внутренним документам компании, multi-tenant изоляция, аналитика пробелов в базе знаний и On-Premises опция.",
  keywords: [
    "RAG бот",
    "онбординг сотрудников",
    "корпоративная база знаний",
    "Slack бот",
    "Telegram бот",
    "AI регламенты",
    "Qdrant",
    "Gemini AI",
    "изоляция данных",
  ],
  authors: [{ name: "DocuBrain Team" }],
  openGraph: {
    title: "DocuBrain — AI-ассистент по регламентам в Slack и Telegram",
    description:
      "Отвечает сотрудникам строго по документам компании. Никаких выдумок, полная изоляция данных tenant_id и On-Premises опция.",
    type: "website",
    locale: "ru_RU",
    siteName: "DocuBrain",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased bg-[#FAFAFB] text-[#111827] dark:bg-[#0F1117] dark:text-[#F3F4F6] transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
