import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome to My Creative World",
  description: "A hand-drawn exhibition-style personal homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
