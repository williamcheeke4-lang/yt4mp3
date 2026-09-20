import Link from "next/link";
import { Music, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070709] text-zinc-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-1.5">
              <Music className="w-4 h-4 text-violet-400" />
              Audio Converters
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/youtube-to-mp3-320kbps" className="hover:text-white transition-colors">
                  YouTube to MP3 320kbps
                </Link>
              </li>
              <li>
                <Link href="/youtube-to-wav" className="hover:text-white transition-colors">
                  YouTube to WAV Lossless
                </Link>
              </li>
              <li>
                <Link href="/convert/youtube-to-flac-converter" className="hover:text-white transition-colors">
                  YouTube to FLAC Converter
                </Link>
              </li>
              <li>
                <Link href="/convert/youtube-to-m4a-converter" className="hover:text-white transition-colors">
                  YouTube to M4A (AAC)
                </Link>
              </li>
              <li>
                <Link href="/convert/youtube-podcast-to-mp3" className="hover:text-white transition-colors">
                  Convert Long Podcasts to MP3
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Video & Shorts</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/youtube-to-mp4-1080p" className="hover:text-white transition-colors">
                  YouTube to MP4 1080p HD
                </Link>
              </li>
              <li>
                <Link href="/youtube-shorts-downloader" className="hover:text-white transition-colors">
                  YouTube Shorts to MP3
                </Link>
              </li>
              <li>
                <Link href="/convert/safe-youtube-mp4-downloader-1080p-60fps" className="hover:text-white transition-colors">
                  YouTube MP4 60FPS
                </Link>
              </li>
              <li>
                <Link href="/convert/youtube-clip-downloader" className="hover:text-white transition-colors">
                  YouTube Clip Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Device Specific</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/convert/youtube-to-mp3-iphone" className="hover:text-white transition-colors">
                  Convert on iPhone (Safari)
                </Link>
              </li>
              <li>
                <Link href="/convert/youtube-to-mp3-mac" className="hover:text-white transition-colors">
                  Safe Converter for Mac
                </Link>
              </li>
              <li>
                <Link href="/convert/save-youtube-video-to-mp3-on-android" className="hover:text-white transition-colors">
                  YouTube to MP3 on Android
                </Link>
              </li>
              <li>
                <Link href="/convert/youtube-mp3-converter-for-chromebook" className="hover:text-white transition-colors">
                  Chromebook Online Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Alternative Search</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/convert/best-ytmp3-alternative-no-popups" className="hover:text-white transition-colors">
                  YTMP3 Alternative (No Ads)
                </Link>
              </li>
              <li>
                <Link href="/convert/flvto-world-alternative-free" className="hover:text-white transition-colors">
                  Flvto Alternative
                </Link>
              </li>
              <li>
                <Link href="/convert/pavosave-alternative-youtube-video-downloader" className="hover:text-white transition-colors">
                  Pavosave Alternative
                </Link>
              </li>
              <li>
                <Link href="/convert/fastest-youtube-to-mp3-no-ads" className="hover:text-white transition-colors">
                  Ad-Free Converter Online
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & DMCA Compliance */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400">
          <p className="max-w-2xl text-[11px] leading-relaxed text-center md:text-left">
            <strong>Disclaimer:</strong> WaveForge is an open web utility intended solely for downloading and converting user-owned media, royalty-free audio, and content under Creative Commons or fair-use educational provisions. We do not store or host copyrighted media on our servers.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>SSL Secured · Zero Logs</span>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-zinc-400 font-mono">
          © {new Date().getFullYear()} WaveForge Engine. Designed for High-Fidelity Audio.
        </div>
      </div>
    </footer>
  );
}
