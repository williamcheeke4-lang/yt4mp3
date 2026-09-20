"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Clipboard,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Music,
  Video,
} from "lucide-react";

interface VideoInfo {
  videoId: string;
  title: string;
  author: string;
  thumbnail: string;
  cleanUrl: string;
}

interface ConverterBoxProps {
  defaultFormat?: "mp3" | "mp4" | "wav" | "flac" | "m4a";
  defaultQuality?: string;
  headline?: React.ReactNode;
  subheadline?: React.ReactNode;
}

export default function ConverterBox({
  defaultFormat = "mp3",
  defaultQuality = "320",
  headline,
  subheadline,
}: ConverterBoxProps) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"mp3" | "mp4" | "wav" | "flac" | "m4a">(defaultFormat);
  const [quality, setQuality] = useState(defaultQuality);

  // Suggestion & Search State
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

  // Video metadata
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);

  // Conversion process
  const [status, setStatus] = useState<"idle" | "converting" | "processing" | "ready" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadTitle, setDownloadTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [progressText, setProgressText] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle URL change & Google Suggest
  useEffect(() => {
    const trimmed = url.trim();

    // Check if it's a YouTube URL
    const isYtUrl = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/.test(trimmed);

    if (isYtUrl) {
      setShowSuggestions(false);
      fetchVideoInfo(trimmed);
      return;
    }

    // If it's a regular text query (music name), query suggestions
    if (trimmed.length > 2 && !trimmed.startsWith("http")) {
      const delay = setTimeout(async () => {
        try {
          setIsSearchingSuggestions(true);
          const res = await fetch(`/api/suggest?q=${encodeURIComponent(trimmed)}`);
          if (res.ok) {
            const data = await res.json();
            setSuggestions(data.suggestions || []);
            setShowSuggestions(data.suggestions && data.suggestions.length > 0);
          }
        } catch {
          // ignore
        } finally {
          setIsSearchingSuggestions(false);
        }
      }, 250);

      return () => clearTimeout(delay);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [url]);

  // Fetch YouTube Info
  async function fetchVideoInfo(ytUrl: string) {
    setIsFetchingInfo(true);
    setErrorMessage("");
    setStatus("idle");
    try {
      const res = await fetch("/api/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: ytUrl }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVideoInfo(data);
      } else {
        setVideoInfo(null);
      }
    } catch {
      setVideoInfo(null);
    } finally {
      setIsFetchingInfo(false);
    }
  }

  // Handle Clipboard Paste
  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch {
      // clipboard permission denied
    }
  }

  // Handle Suggestion Select
  function handleSelectSuggestion(suggestion: string) {
    setUrl(suggestion);
    setShowSuggestions(false);
  }

  // Poll for Progress
  function startPollingProgress(progressUrl: string, title: string) {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    let checks = 0;
    pollingIntervalRef.current = setInterval(async () => {
      checks++;
      try {
        const res = await fetch(`/api/progress?url=${encodeURIComponent(progressUrl)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.progress) {
            const pct = Math.min(Math.round((data.progress / 1000) * 100), 99);
            setProgressPercent(pct > 0 ? pct : 35);
          }
          if (data.text) {
            setProgressText(data.text);
          }

          if (data.download_url) {
            if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
            setDownloadUrl(data.download_url);
            setDownloadTitle(data.title || title);
            setStatus("ready");
            setProgressPercent(100);
          }
        }
      } catch {
        // ignore network hiccups during polling
      }

      // Timeout after 60 seconds (40 checks)
      if (checks > 40) {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        setStatus("error");
        setErrorMessage("Conversion took too long. Please try again.");
      }
    }, 1500);
  }

  // Execute Conversion
  async function handleConvert() {
    if (!url.trim()) {
      setErrorMessage("Please enter a valid YouTube video link or title.");
      return;
    }

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
    }

    setStatus("converting");
    setErrorMessage("");
    setProgressPercent(20);
    setProgressText("Initializing audio/video extractor...");

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: videoInfo?.cleanUrl || url.trim(),
          format,
          quality,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.status === "ready" && data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
          setDownloadTitle(data.title || videoInfo?.title || "download");
          setStatus("ready");
          setProgressPercent(100);
        } else if (data.status === "processing" && data.progressUrl) {
          setStatus("processing");
          setProgressPercent(45);
          setProgressText("Processing media container...");
          startPollingProgress(data.progressUrl, data.title || videoInfo?.title || "media");
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Could not generate download stream.");
        }
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to initialize conversion.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection error. Please check your internet and retry.");
    }
  }

  return (
    <section id="converter" className="relative w-full max-w-4xl mx-auto px-4 pt-12 pb-16">
      {/* Subtle ambient gradient backdrop */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-2xl h-80 bg-gradient-to-r from-violet-600/20 via-primary-glow to-cyan-500/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Headings */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Lossless Direct Streaming Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {headline || (
            <>
              Next-Gen <span className="bg-gradient-to-r from-violet-400 via-primary to-cyan-400 bg-clip-text text-transparent">YouTube to MP3</span> Converter
            </>
          )}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
          {subheadline ||
            "Download studio-quality 320kbps MP3 audio & 1080p MP4 videos with zero popups, no signup, and lightning-fast speed."}
        </p>
      </div>

      {/* Converter Command Panel */}
      <div className="glass-panel-elevated rounded-2xl p-4 sm:p-6 relative transition-all">
        {/* Input Bar */}
        <div ref={searchBoxRef} className="relative">
          <div className="relative flex items-center bg-[#09090b]/90 border border-white/10 rounded-xl overflow-hidden focus-within:border-violet-500/80 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all shadow-inner">
            <div className="pl-4 text-zinc-500">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConvert()}
              placeholder="Paste YouTube link (or search by song title)..."
              className="w-full py-4 px-3 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-sm sm:text-base font-normal"
            />

            {/* Paste Button */}
            <button
              onClick={handlePaste}
              type="button"
              className="mr-2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 text-xs font-medium border border-white/5 transition-colors"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </button>

            {/* Action Trigger */}
            <button
              onClick={handleConvert}
              disabled={status === "converting" || status === "processing"}
              className="mr-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-primary hover:from-violet-500 hover:to-primary-hover text-white text-sm font-semibold shadow-md shadow-violet-600/30 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
            >
              {status === "converting" || status === "processing" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <span>Convert</span>
                </>
              )}
            </button>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#121217] border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden divide-y divide-white/5">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-900/60 flex items-center justify-between">
                <span>Google Suggested Queries</span>
                {isSearchingSuggestions && <Loader2 className="w-3 h-3 animate-spin text-zinc-400" />}
              </div>
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:text-white hover:bg-violet-600/20 flex items-center gap-2.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Video Preview Card */}
        {videoInfo && (
          <div className="mt-4 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center gap-4 transition-all">
            <div className="relative w-full sm:w-44 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
              <Image
                src={videoInfo.thumbnail}
                alt={videoInfo.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-300">
                HD Preview
              </div>
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="text-sm font-semibold text-white truncate">{videoInfo.title}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{videoInfo.author}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready to Download
                </span>
                <span className="text-[10px] text-zinc-500">ID: {videoInfo.videoId}</span>
              </div>
            </div>
          </div>
        )}

        {/* Format & Quality Pickers */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          {/* Format Tabs */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => {
                setFormat("mp3");
                setQuality("320");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                format === "mp3"
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              MP3 Audio
            </button>
            <button
              onClick={() => {
                setFormat("wav");
                setQuality("16-bit");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                format === "wav"
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              WAV
            </button>
            <button
              onClick={() => {
                setFormat("m4a");
                setQuality("256");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                format === "m4a"
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              M4A
            </button>
            <button
              onClick={() => {
                setFormat("mp4");
                setQuality("1080");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                format === "mp4"
                  ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              MP4 Video
            </button>
          </div>

          {/* Quality Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Quality:</span>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-zinc-900 border border-white/10 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-violet-500 text-xs font-medium cursor-pointer"
            >
              {format === "mp4" ? (
                <>
                  <option value="1080">1080p (Full HD 60FPS)</option>
                  <option value="720">720p (HD)</option>
                  <option value="480">480p (Standard)</option>
                </>
              ) : format === "wav" ? (
                <>
                  <option value="16-bit">16-bit 44.1kHz (CD Master)</option>
                  <option value="24-bit">24-bit 48kHz (Studio Master)</option>
                </>
              ) : (
                <>
                  <option value="320">320 kbps (Maximum Fidelity)</option>
                  <option value="256">256 kbps (High Quality)</option>
                  <option value="192">192 kbps (Standard Audio)</option>
                  <option value="128">128 kbps (Compact Size)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Progress State (Real Dynamic Percentage) */}
        {(status === "converting" || status === "processing") && (
          <div className="mt-5 p-4 rounded-xl bg-violet-950/30 border border-violet-500/20 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-300 text-xs font-medium">
                <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                <span>{progressText || "Processing media stream..."}</span>
              </div>
              <span className="text-xs font-mono font-bold text-violet-300">
                {progressPercent > 0 ? `${progressPercent}%` : ""}
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 via-primary to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(progressPercent, 15)}%` }}
              />
            </div>
          </div>
        )}

        {/* Ready State: DIRECT DOWNLOAD BUTTON */}
        {status === "ready" && downloadUrl && (
          <div className="mt-5 p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  Download Ready! ({format.toUpperCase()})
                </span>
                <span className="text-xs text-emerald-300/80 block max-w-sm truncate">
                  {downloadTitle || "Click the button to download directly."}
                </span>
              </div>
            </div>

            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              <span>Download {format.toUpperCase()}</span>
            </a>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="mt-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center gap-2.5 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
}
