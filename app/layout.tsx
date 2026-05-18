import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "./_components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mnonlinecoach.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MN Online Coach — The Weekly Coaching Email",
  description:
    "Every week, Maciej breaks down one training, nutrition, or mindset lesson you can actually apply. No fluff, no fads, no selling. Free.",
  keywords: [
    "online fitness coach",
    "fitness newsletter",
    "training tips",
    "nutrition coaching",
    "MN Online Coach",
  ],
  openGraph: {
    title: "The Weekly Coaching Email That Cuts Through the Fitness BS",
    description:
      "One training, nutrition, or mindset lesson you can actually apply — straight from your coach, every week. Free.",
    url: siteUrl,
    siteName: "MN Online Coach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Weekly Coaching Email That Cuts Through the Fitness BS",
    description:
      "One training, nutrition, or mindset lesson you can actually apply — straight from your coach, every week. Free.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
