import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RoleProvider } from "@/lib/role/RoleContext";
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
  title: "TMS Telos — UI Prototype",
  description: "UI-прототип облачной части ПО TMS Telos: парк моторов, live-сессии, anti-cheat replay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
