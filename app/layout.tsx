import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.ccgroupllc.com";
const siteName = "C&C Group LLC";
const description =
  "C&C Group LLC delivers premium roofing and general contracting services in the DFW area — free estimates, licensed crews, and appointment booking online.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Roofing & General Contracting`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "C&C Group LLC",
    "roofing contractor DFW",
    "general contractor Dallas Fort Worth",
    "roof replacement",
    "roof repair estimate",
    "residential roofing",
    "commercial roofing",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  category: "Home Services",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Roofing & General Contracting`,
    description,
    images: [
      {
        url: "https://i.ibb.co/qY8HcV11/image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} — Roofing & General Contracting`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Roofing & General Contracting`,
    description,
    images: ["https://i.ibb.co/qY8HcV11/image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#101317] text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}