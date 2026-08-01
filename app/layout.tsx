import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GeoScope",
  description:
    "Understand global events with AI-powered explanations and context.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-50 text-gray-900`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}