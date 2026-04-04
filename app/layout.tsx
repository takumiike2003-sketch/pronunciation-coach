import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "発音管理アプリ",
  description: "18ステップで英語の発音をマスター",
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
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
          <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4-1h8M12 4a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3z" /></svg>
              </div>
              <span className="text-base font-semibold text-slate-800 tracking-tight">発音管理アプリ</span>
            </Link>
            <div className="flex gap-1">
              <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                一覧
              </Link>
              <Link href="/practice" className="text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">
                総合練習
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full">
          {children}
        </main>
        <footer className="border-t border-slate-200/60 py-6">
          <div className="max-w-5xl mx-auto px-6 text-center text-xs text-slate-400">
            発音管理アプリ
          </div>
        </footer>
      </body>
    </html>
  );
}
