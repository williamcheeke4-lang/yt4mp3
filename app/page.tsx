import ConverterBox from "@/components/ConverterBox";
import AudioComparisonTable from "@/components/AudioComparisonTable";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowToSection from "@/components/HowToSection";
import FaqSection from "@/components/FaqSection";
import Link from "next/link";
import { Music2, Video, Sparkles, Disc, Check } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero with Converter Box */}
      <ConverterBox
        headline={
          <>
            Next-Gen <span className="bg-gradient-to-r from-violet-400 via-primary to-cyan-400 bg-clip-text text-transparent">YouTube to MP3</span> Converter
          </>
        }
        subheadline="Fast, ad-free studio audio extraction. Convert YouTube videos and Shorts into pure 320kbps MP3, WAV, or 1080p MP4 in seconds."
      />

      {/* Trust & Metric Highlights */}
      <section className="max-w-4xl mx-auto px-4 -mt-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">320 kbps</div>
            <div className="text-xs text-zinc-400 mt-0.5">True Max Bitrate</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">0 Ads</div>
            <div className="text-xs text-zinc-400 mt-0.5">Zero Popups or Redirects</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">&lt; 3.0s</div>
            <div className="text-xs text-zinc-400 mt-0.5">Average Pipeline Latency</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xl sm:text-2xl font-bold font-mono text-violet-400">100% Free</div>
            <div className="text-xs text-zinc-400 mt-0.5">No Signup Required</div>
          </div>
        </div>
      </section>

      {/* Formats Showcase */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/youtube-to-mp3-320kbps"
            className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-violet-500/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Music2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
              MP3 320kbps High Fidelity →
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Preserve crisp highs and deep punchy bass. Encoded with constant bitrate algorithms for car stereos and phones.
            </p>
          </Link>

          <Link
            href="/youtube-to-wav"
            className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-cyan-500/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Disc className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
              WAV 16-Bit Studio Master →
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Uncompressed PCM audio container. Perfect for music producers importing samples into FL Studio or Ableton.
            </p>
          </Link>

          <Link
            href="/youtube-to-mp4-1080p"
            className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-emerald-500/30 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
              MP4 1080p 60FPS Video →
            </h3>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Full HD and 4K video downloads. Smooth 60 frames per second playback without watermarks or downscaling.
            </p>
          </Link>
        </div>
      </section>

      {/* Technical Comparison Table */}
      <AudioComparisonTable />

      {/* How It Works */}
      <HowToSection />

      {/* Core Features */}
      <FeaturesGrid />

      {/* Detailed E-E-A-T Guide Section for Organic Ranking */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-zinc-300 text-sm leading-relaxed border-t border-white/5">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Why Online YouTube Conversion Demands Modern Architecture
        </h2>
        <p className="mb-4 text-zinc-400">
          For more than a decade, users converting YouTube media have endured aggressive ad networks, deceptive download triggers, and fake bitrates. Traditional converter services scrape low-quality 64kbps mobile streams and re-encode them into bloated 320kbps MP3 files, resulting in muffled frequency response and digital distortion.
        </p>
        <p className="mb-4 text-zinc-400">
          YT4MP3 utilizes direct media stream demuxing. When you supply a YouTube video or Shorts link, our distributed edge pipeline isolates the native Opus audio track (sampled at 48,000 Hz) and packages it directly into the MP3, WAV, or M4A container of your choice.
        </p>

        <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Pure Constant Bitrate (CBR) Encoding at 320 kbps</span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Direct Safari iOS and Android File Manager Integration</span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Zero Tracking Pixels, Zero Push Notification Requests</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
