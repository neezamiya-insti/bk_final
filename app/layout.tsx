import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boyut Al-Kawthar | Saudi Exporters' Gateway to Global Markets",
  description:
    "Boyut Al-Kawthar is your strategic partner in global trade, helping Saudi manufacturers and exporters access international markets and grow their exports.",
  keywords: [
    "Boyut Al-Kawthar",
    "Saudi Exporters",
    "Saudi Exports",
    "Global Trade",
    "International Trade",
    "Export Solutions",
    "Saudi Arabia",
  ],
  authors: [{ name: "Boyut Al-Kawthar" }],
  creator: "Boyut Al-Kawthar",
  publisher: "Boyut Al-Kawthar",
  metadataBase: new URL("https://bk.com.sa"),
  alternates: {
    canonical: "https://bk.com.sa/",
  },
  openGraph: {
    title: "Boyut Al-Kawthar | Saudi Exporters' Gateway to Global Markets",
    description:
      "Take your products global with Boyut Al-Kawthar. We help Saudi manufacturers and exporters navigate international markets and expand their global reach.",
    url: "https://bk.com.sa/",
    siteName: "Boyut Al-Kawthar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-Boyot-1.png",
        width: 1200,
        height: 630,
        alt: "Boyut Al-Kawthar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boyut Al-Kawthar | Saudi Exporters' Gateway to Global Markets",
    description:
      "Your strategic partner in global trade and Saudi export expansion.",
    images: ["/logo-Boyot-1.png"],
  },
  icons: {
    icon: "/logo-Boyot-1.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}