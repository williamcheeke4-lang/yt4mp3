import ConverterBox from "@/components/ConverterBox";
import FaqSection from "@/components/FaqSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube to MP4 1080p 60FPS – Free HD Video Downloader Online",
  description:
    "Convert and download YouTube videos to 1080p Full HD and 4K MP4 format. Smooth 60FPS playback, no watermarks, and fast downloads across all mobile and desktop devices.",
  alternates: {
    canonical: "https://yt4mp3.cc/youtube-to-mp4-1080p",
  },
};

export default function YoutubeToMp4Page() {
  const customFaqs = [
    {
      q: "Does this downloader support 1080p 60FPS and 4K YouTube videos?",
      a: "Yes. Our pipeline supports full 1080p at 60 frames per second, 1440p (2K), and 2160p (4K UHD) wherever high-resolution streams are made available by the video creator.",
    },
    {
      q: "Why do some converters only download 720p?",
      a: "YouTube serves video and audio as separate adaptive streams for resolutions higher than 720p (DASH streams). Most basic converter websites cannot multiplex high-res video with audio tracks on the fly. YT4MP3 dynamically merges the 1080p video stream with the crystal-clear audio track into a single MP4 file.",
    },
  ];

  return (
    <div>
      <ConverterBox
        defaultFormat="mp4"
        defaultQuality="1080"
        headline={
          <>
            YouTube to <span className="text-emerald-400">MP4 1080p HD</span> Downloader
          </>
        }
        subheadline="High definition video extraction with smooth 60fps playback. Download Full HD and 4K YouTube videos with zero watermarks."
      />

      <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-300 text-sm leading-relaxed">
        <h2 className="text-2xl font-bold text-white mb-3">
          Full HD 1080p MP4 Multiplexing
        </h2>
        <p className="text-zinc-400 mb-4">
          Enjoy offline videos in crisp 1920x1080 resolution on large screen televisions, PC monitors, tablets, and smartphones. Compatible with standard VLC, QuickTime, and Windows Media Player without extra codecs.
        </p>
      </div>

      <FeaturesGrid />
      <FaqSection customFaqs={customFaqs} />
    </div>
  );
}
