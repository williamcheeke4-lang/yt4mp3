import ConverterBox from "@/components/ConverterBox";
import AudioComparisonTable from "@/components/AudioComparisonTable";
import FaqSection from "@/components/FaqSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube to WAV Converter – Uncompressed 16-Bit Lossless PCM Audio",
  description:
    "Convert YouTube to WAV audio format online. 100% uncompressed 16-bit / 44.1kHz audio for music producers, video editors, and audio engineers. Fast, free, and no software needed.",
  alternates: {
    canonical: "/youtube-to-wav",
  },
};

export default function YoutubeToWavPage() {
  const customFaqs = [
    {
      q: "What makes WAV better than MP3 for music production?",
      a: "WAV is an uncompressed Linear PCM audio format. Unlike MP3, which discards subtle audio information through lossy psychoacoustic masking, WAV preserves exact sample data, preventing generational loss when editing, slicing, or equalizing audio inside DAWs like FL Studio, Ableton Live, Logic Pro, or Pro Tools.",
    },
    {
      q: "Can I convert YouTube audio to WAV directly on iPhone or Mac?",
      a: "Yes. WaveForge works in Safari on iOS, macOS, Chrome on Windows, and Android. The extracted .wav file can be downloaded directly into your system files with zero conversion software or plugins.",
    },
  ];

  return (
    <div>
      <ConverterBox
        defaultFormat="wav"
        defaultQuality="16-bit"
        headline={
          <>
            YouTube to <span className="text-cyan-400">WAV Lossless</span> Converter
          </>
        }
        subheadline="Uncompressed studio PCM audio extraction. Ideal for music producers, DJs, and sound designers seeking uncompressed dynamic range."
      />

      <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-300 text-sm leading-relaxed">
        <h2 className="text-2xl font-bold text-white mb-3">
          Why Professional Creators Prefer WAV over MP3
        </h2>
        <p className="text-zinc-400 mb-4">
          WAV (Waveform Audio File Format) was developed jointly by Microsoft and IBM as the universal standard for raw audio bitstreams. For sound designers sampling dialogue, drum hits, or instrumental stems from YouTube, saving as WAV prevents secondary lossy compression artifacts.
        </p>
      </div>

      <AudioComparisonTable />
      <FeaturesGrid />
      <FaqSection customFaqs={customFaqs} />
    </div>
  );
}
