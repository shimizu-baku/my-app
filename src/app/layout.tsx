import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuizProvider } from "@/context/QuizContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "クイズチャレンジ | 無料の4択クイズアプリ",
  description:
    "一般常識・科学・歴史など複数のカテゴリとレベルから選べる無料の4択クイズアプリ。スコアに応じたランク判定と解説付きで、知識を試しながら楽しく学べます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950">
        <QuizProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}
