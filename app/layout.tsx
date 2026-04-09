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
  metadataBase: new URL("https://keppekisinkan2026.github.io"),
  title: {
    default: "2026年度新歓特設サイト | 劇団ケッペキ",
    template: "%s | 劇団ケッペキ",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "400x400" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  description:
    "京都大学公認学生劇団「劇団ケッペキ」2026年度新歓特設サイト。劇団紹介、部署紹介、新歓イベント、公演ができるまで、過去公演、Q&Aを掲載しています。",
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
