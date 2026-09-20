import ConverterBox from "@/components/ConverterBox";
import FaqSection from "@/components/FaqSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Shorts to MP3 & MP4 Downloader – Fast, Free & Mobile Ready",
  description:
    "Convert and download YouTube Shorts clips to 320kbps MP3 audio or 1080x1920 vertical MP4 video in seconds. 100% ad-free on iPhone and Android.",
  alternates: {
    canonical: "https://www.yt4mp3.cc/youtube-shorts-downloader",
  },
};

export default function YoutubeShortsPage() {
  const customFaqs = [
    {
      q: "How do I copy a YouTube Shorts link for downloading?",
      a: "In the YouTube app on your phone, open the Short, tap the 'Share' arrow icon, and select 'Copy link'. Then return to YT4MP3, tap 'Paste', and click Convert.",
    },
    {
      q: "Can I extract only the audio track from a YouTube Short?",
      a: "Yes! Simply choose MP3 as the output format. YT4MP3 will isolate the viral background track or speech from the vertical video and save it as a clean MP3 file.",
    },
  ];

  return (
    <div>
      <ConverterBox
        defaultFormat="mp3"
        defaultQuality="320"
        headline={
          <>
            YouTube <span className="text-amber-400">Shorts Downloader</span> & Audio Extractor
          </>
        }
        subheadline="Save viral YouTube Shorts directly to your camera roll or extract audio tracks as 320kbps MP3 in under 3 seconds."
      />

      <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-300 text-sm leading-relaxed">
        <h2 className="text-2xl font-bold text-white mb-3">
          Instant Vertical Video & Background Music Extraction
        </h2>
        <p className="text-zinc-400 mb-4">
          Whether you want to save inspirational speeches, trending dance audio, or comedy skits from YouTube Shorts, YT4MP3 supports native vertical aspect ratio (9:16) rendering with zero quality loss.
        </p>
      </div>

      <FeaturesGrid />
      <FaqSection customFaqs={customFaqs} />
    </div>
  );
}
