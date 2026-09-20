import { ShieldCheck, Zap, Disc3, Smartphone, Clock, Lock } from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Ad-Free & Clean Protocol",
      desc: "Zero deceptive pop-ups, no malicious redirect traps, and no browser extension spam. Just a clean, fast media extraction tool.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Disc3,
      title: "Real 320 kbps Bit-Depth",
      desc: "We extract the direct native audio container without dynamic compression or fake upsampling, giving you true audiophile fidelity.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: Zap,
      title: "Instant Edge Processing",
      desc: "Demuxed on high-speed global edge relays. Audio tracks are delivered in seconds with no artificial wait queues.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      icon: Smartphone,
      title: "iPhone & Android Native",
      desc: "Works directly inside mobile Safari and Chrome. Downloaded MP3 and MP4 files save directly to your Files or Music app.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: Clock,
      title: "No Duration Limitations",
      desc: "Convert lengthy 2-hour podcasts, full DJ live sets, study soundscapes, and conference lectures without arbitrary 20-minute cutoffs.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      icon: Lock,
      title: "Zero Log Retention",
      desc: "No user account required. We do not store, catalog, or keep any conversion history or downloaded media on our servers.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 border-t border-white/5">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Engineered for Media Fidelity & Privacy
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
          Built to replace shady ad-ridden converter websites with a reliable, high-performance web utility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/15 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
