import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTA 6 Release Countdown",
  description: "Countdown to GTA 6 release. GTA 6 releases on 26th May of 2026",
  keywords: [
    "GTA6",
    "Grand Theft Auto 6",
    "Countdown",
    "GTA 6 Countdown",
    "GTA 6",
    "GTA 6 Release Date",
    "GTA 6 Release Date Countdown",
    "26 May 2026",
    "May 26 2026",
    "GTA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-gta6-gradient">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
