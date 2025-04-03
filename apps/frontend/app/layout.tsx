import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechAI",
  description: "Your AI-powered full-stack engineer, ready when you are",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${monaSans.variable} ${geistMono.variable} antialiased bg-[#f3f3f3] overflow-x-hidden`}
        >
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
