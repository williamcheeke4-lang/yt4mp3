import { Link2, SlidersHorizontal, DownloadCloud } from "lucide-react";

export default function HowToSection() {
  const steps = [
    {
      num: "01",
      icon: Link2,
      title: "Copy the YouTube Link",
      desc: "Navigate to YouTube in your browser or mobile app. Copy the URL of any video, Shorts clip, or music track you wish to extract.",
    },
    {
      num: "02",
      icon: SlidersHorizontal,
      title: "Pick Container & Quality",
      desc: "Paste the link into the converter box. Choose between high-fidelity MP3 (320kbps), studio WAV, or crystal-clear 1080p MP4 video.",
    },
    {
      num: "03",
      icon: DownloadCloud,
      title: "Direct One-Click Download",
      desc: "Click Convert. The media stream is prepared in under 3 seconds. Tap Download to save the file straight to your local device.",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
          Simple 3-Step Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          How to Convert YouTube to MP3 & MP4 Online
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-white/10 flex flex-col justify-between"
          >
            <div className="absolute top-4 right-4 text-4xl font-extrabold font-mono text-white/[0.04]">
              {s.num}
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
