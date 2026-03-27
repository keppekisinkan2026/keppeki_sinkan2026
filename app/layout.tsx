import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "./components/Header";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import "./globals.css";

const makiCircle = localFont({
  src: "../public/fonts/makiirclehand.ttf",
  variable: "--font-maki-circle",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "2026年度新歓特設サイト | 劇団ケッペキ",
  description: "劇団ケッペキ 2026年度新歓特設サイト メンテナンスページ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={makiCircle.variable}>
        <Header />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
