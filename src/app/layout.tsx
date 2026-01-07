import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// IMPORT THE NAVBAR
import Navbar from "@/src/components/layout/navBar"; 

// Configure Local Font (Juana Alt Bold)
const juanaLocal = localFont({
  src: "./fonts/Juana Alt Bold.ttf",
  variable: "--font-serif",
  weight: "700",
  display: "swap",
});
const gtStandard = localFont({
  src: "./fonts/GT-Standard-L-Standard-Light-Trial.woff2",
  variable: "--font-gt-standard",
  display: "swap",
})

const _geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Christian Books AI",
  description: "Explore curated Christian literature and theology books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${juanaLocal.variable} ${gtStandard.variable} ${_inter.variable} ${_geist.variable} ${_geistMono.variable}`}
    >
      <body className={`font-sans antialiased`}>
        {/* Render Navbar here so it stays on every page */}
        <Navbar />
        
        {children}
        
        <Analytics />
      </body>
    </html>
  );
}