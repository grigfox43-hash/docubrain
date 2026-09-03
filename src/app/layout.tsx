import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { AuthModal } from "@/components/AuthModal";

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
    "Google Gemini",
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
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('docubrain_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased bg-[#FAFAFB] text-[#111827] dark:bg-[#0F1117] dark:text-[#F3F4F6] transition-colors duration-200 font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
              <AuthModal />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
