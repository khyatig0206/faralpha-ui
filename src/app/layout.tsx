import type { Metadata } from "next";
import localFont from "next/font/local"; // Import localFont loader
import "./globals.css";
import Navbar from "@/src/components/layout/navBar"; 

// 1. Load Boring Sans (Your Body/Sans Font)
const boringSans = localFont({
  src: "./fonts/Boring-Sans-A-Regular-trial.ttf",
  variable: "--font-sans",
  weight: "400",
  display: "swap",
});

// 2. Load Juana (Your Heading/Serif Font)
const juana = localFont({
  src: "./fonts/Fontspring-DEMO-juana-semibold.otf",
  variable: "--font-serif",
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Christian Books AI",
  description: "AI-powered Christian literature platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${boringSans.variable} ${juana.variable} antialiased bg-background text-foreground`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">
            {children}
          </main>
          {/* Re-added the footer we designed earlier */}
          <footer className="py-8 border-t border-border bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
              © 2026 Christian Books AI. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}