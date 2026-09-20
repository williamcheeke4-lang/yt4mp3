export default function AudioComparisonTable() {
  const formats = [
    {
      format: "MP3 (320 kbps)",
      codec: "MPEG-1 Layer III",
      sampleRate: "44.1 kHz / 48 kHz",
      bitDepth: "16-bit float",
      compression: "Perceptual Lossy (CBR)",
      fileSize: "~7.2 MB per 3 min",
      fidelity: "Indistinguishable from CD to 99% of listeners",
      bestFor: "Car stereos, smartphones, gym workouts, standard playback",
    },
    {
      format: "WAV (Uncompressed)",
      codec: "Linear PCM",
      sampleRate: "44.1 kHz / 96 kHz",
      bitDepth: "16-bit / 24-bit Integer",
      compression: "Lossless (Zero compression)",
      fileSize: "~31 MB per 3 min",
      fidelity: "Exact bit-for-bit studio master copy",
      bestFor: "DAWs (FL Studio, Ableton, Logic), music remixing, video editing",
    },
    {
      format: "FLAC (Audiophile)",
      codec: "Free Lossless Audio",
      sampleRate: "44.1 kHz / 48 kHz",
      bitDepth: "16-bit / 24-bit",
      compression: "Lossless (Variable)",
      fileSize: "~18 MB per 3 min",
      fidelity: "100% mathematical preservation of audio data",
      bestFor: "Hi-Fi sound systems, audiophile archiving",
    },
    {
      format: "M4A / AAC",
      codec: "Advanced Audio Coding",
      sampleRate: "44.1 kHz",
      bitDepth: "16-bit",
      compression: "Lossy (Next-gen Psychoacoustic)",
      fileSize: "~5.8 MB per 3 min",
      fidelity: "Superior efficiency compared to legacy 192k MP3",
      bestFor: "Apple devices, iPhone, iPad, Safari, battery conservation",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Audio Bitrate & Fidelity Benchmark
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          Unlike legacy converters that falsely upscale 64kbps to 320kbps, our pipeline streams the direct Opus/AAC source container.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 glass-panel">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-white/[0.04] border-b border-white/10 text-zinc-300 font-mono text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Audio Container</th>
              <th className="py-3.5 px-4">Sample Rate</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Bit Depth</th>
              <th className="py-3.5 px-4">Est. File Size</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Optimal Application</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {formats.map((f, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">
                  {f.format}
                  <span className="block text-[11px] font-normal text-zinc-400 font-mono">
                    {f.codec}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-zinc-400">{f.sampleRate}</td>
                <td className="py-3.5 px-4 font-mono text-zinc-400 hidden sm:table-cell">
                  {f.bitDepth}
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-mono font-medium">
                  {f.fileSize}
                </td>
                <td className="py-3.5 px-4 text-zinc-400 text-xs hidden md:table-cell">
                  {f.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
