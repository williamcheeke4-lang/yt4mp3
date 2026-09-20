"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ customFaqs }: { customFaqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: FaqItem[] = [
    {
      q: "Does this tool provide genuine 320kbps MP3 audio?",
      a: "Yes. Many legacy converter sites deceptively re-encode low-quality 64kbps audio into 320kbps files without any fidelity gain. WaveForge directly demuxes the highest available native Opus or AAC stream (often 160kbps to 256kbps native master) and encodes it with a full 320kbps Constant Bitrate (CBR) LAME algorithm at 48kHz, ensuring the broadest possible dynamic range.",
    },
    {
      q: "How can I convert and save YouTube audio on an iPhone or iPad?",
      a: "On iOS (Safari), simply paste the YouTube link into the converter box above, select MP3 or M4A, and click Convert. When the green Download button appears, tap it. Safari will ask 'Do you want to download this file?'. Tap Download, and the file will save directly into your iOS Files app in the Downloads folder, playable via the native audio player or transferable to Apple Music.",
    },
    {
      q: "Why is WaveForge completely ad-free and without pop-ups?",
      a: "Most converter portals monetize through invasive pop-under ad networks, deceptive fake download buttons, and push notification spam that can expose users to malware. We believe in providing a clean, developer-grade utility that respects user security, device memory, and privacy.",
    },
    {
      q: "What is the difference between MP3 and WAV format?",
      a: "MP3 is a lossy compressed format that removes frequencies imperceptible to the human ear, resulting in a lightweight ~7MB file ideal for phones and car stereos. WAV is an uncompressed, studio-grade Linear PCM format that preserves 100% of the raw audio data, resulting in a ~30MB file best suited for audio editing, music production (DAWs like FL Studio and Ableton), and mastering.",
    },
    {
      q: "Are there any video length or duration limitations?",
      a: "No. Unlike other services that arbitrarily cut off videos exceeding 20 or 30 minutes, WaveForge can process long-form YouTube content including 1-hour to 3-hour podcasts, full audiobooks, study ambience, and DJ concerts without truncating the audio.",
    },
    {
      q: "Is it legal to download YouTube videos for personal offline listening?",
      a: "Under standard Fair Use doctrines and common copyright provisions, downloading content for personal, non-commercial offline study, backup, or personal enjoyment is widely practiced. However, you should not redistribute, broadcast, sell, or claim ownership of copyrighted material without permission from the respective rights holder.",
    },
  ];

  const faqs = customFaqs || defaultFaqs;

  // Generate FAQ Schema JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Everything you need to know about high-fidelity audio extraction and device compatibility.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-white/5 glass-panel overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm sm:text-base font-semibold text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-violet-400" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
