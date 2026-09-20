import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://waveforge.app"),
  title: {
    default: "WaveForge: YouTube to MP3 Converter (320kbps) & MP4 Downloader",
    template: "%s | WaveForge",
  },
  description:
    "Fast, free, and ad-free YouTube to MP3 converter. Download studio-quality 320kbps MP3 audio, uncompressed WAV, and 1080p MP4 videos with zero popups and no software required.",
  keywords: [
    "youtube to mp3",
    "youtube to mp3 converter",
    "youtube to mp3 320kbps",
    "youtube to mp4",
    "youtube to wav",
    "ytmp3",
    "y2mate alternative",
    "flvto",
    "youtube audio downloader",
    "safe youtube converter"
  ],
  authors: [{ name: "WaveForge Media Lab" }],
  creator: "WaveForge Media Lab",
  publisher: "WaveForge Media Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://waveforge.app",
    siteName: "WaveForge",
    title: "WaveForge: High Fidelity YouTube to MP3 & MP4 Converter",
    description:
      "Convert YouTube videos to 320kbps MP3 and 1080p MP4 with zero pop-up ads or redirects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WaveForge YouTube Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WaveForge: YouTube to MP3 320kbps Converter",
    description:
      "100% ad-free, studio-grade YouTube to MP3 and MP4 conversion pipeline.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // WebApplication JSON-LD Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WaveForge",
    url: "https://waveforge.app",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Windows, macOS, iOS, Android, Linux)",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "320kbps High Fidelity MP3 Conversion",
      "Lossless WAV 16-bit PCM Audio Extraction",
      "1080p Full HD MP4 Video Downloads",
      "Native iOS Safari and Android Mobile Support",
      "Zero Pop-Up Ads and Zero Redirects",
      "Real-Time Google Search Suggestion Dropdown",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body className="bg-[#09090b] text-white flex flex-col min-h-screen selection:bg-violet-500/30 selection:text-violet-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
