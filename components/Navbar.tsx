import Link from "next/link";
import { Music, Video, Sparkles, Layers, ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-primary to-accent flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              RootVogue<span className="text-violet-400">.com</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                PRO
              </span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono -mt-1">
              Fast YouTube to MP3 & MP4
            </span>
          </div>
        </Link>

        {/* Pillar Quick Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-300">
          <Link
            href="/youtube-to-mp3-320kbps"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5 text-violet-400" />
            MP3 320k
          </Link>
          <Link
            href="/youtube-to-wav"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            WAV Lossless
          </Link>
          <Link
            href="/youtube-to-mp4-1080p"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Video className="w-3.5 h-3.5 text-emerald-400" />
            MP4 1080p
          </Link>
          <Link
            href="/youtube-shorts-downloader"
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Shorts
          </Link>
        </nav>

        {/* USP Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 font-mono bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Ad-Free Protocol</span>
          </div>
          <Link
            href="#converter"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
          >
            Convert Now
          </Link>
        </div>
      </div>
    </header>
  );
}
