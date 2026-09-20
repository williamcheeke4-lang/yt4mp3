import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yt4mp3.cc"),
  title: {
    default: "YT4MP3: Fast YouTube to MP3 Converter (320kbps) & MP4 Downloader",
    template: "%s | YT4MP3.cc",
  },
  description:
    "Fast, free, and ad-free YouTube to MP3 converter. Download studio-quality 320kbps MP3 audio, uncompressed WAV, and 1080p MP4 videos with zero popups and no software required on www.yt4mp3.cc.",
  keywords: [
    "yt4mp3",
    "yt4mp3.cc",
    "www.yt4mp3.cc",
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
  authors: [{ name: "YT4MP3 Media Lab" }],
  creator: "YT4MP3 Media Lab",
  publisher: "YT4MP3 Media Lab",
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
  alternates: {
    canonical: "https://www.yt4mp3.cc/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.yt4mp3.cc",
    siteName: "YT4MP3.cc",
    title: "YT4MP3: High Fidelity YouTube to MP3 & MP4 Converter",
    description:
      "Convert YouTube videos to 320kbps MP3 and 1080p MP4 with zero pop-up ads or redirects on www.yt4mp3.cc.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YT4MP3 YouTube Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YT4MP3: YouTube to MP3 320kbps Converter",
    description:
      "100% ad-free, fast YouTube to MP3 and MP4 conversion pipeline on www.yt4mp3.cc.",
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
    name: "YT4MP3",
    url: "https://www.yt4mp3.cc",
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
