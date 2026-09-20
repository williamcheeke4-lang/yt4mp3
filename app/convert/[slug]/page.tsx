import { notFound } from "next/navigation";
import ConverterBox from "@/components/ConverterBox";
import AudioComparisonTable from "@/components/AudioComparisonTable";
import FaqSection from "@/components/FaqSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import { TOP_KEYWORDS, getKeywordBySlug } from "@/lib/keywords";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return TOP_KEYWORDS.map((k) => ({
    slug: k.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getKeywordBySlug(params.slug);
  if (!item) {
    // Generate intelligent dynamic metadata from slug
    const cleanTitle = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      title: `${cleanTitle} – Free High-Fidelity Converter | WaveForge`,
      description: `Fast and ad-free online converter for ${cleanTitle}. Download studio-grade MP3 or MP4 with zero pop-up advertisements.`,
    };
  }

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `/convert/${item.slug}`,
    },
  };
}

export default function DynamicKeywordPage({ params }: Props) {
  const item = getKeywordBySlug(params.slug);

  // Fallback for slugs not in the top 10 list
  const title = item
    ? item.title
    : `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`;

  const format = item?.format || "mp3";
  const quality = item?.quality || "320";

  const dynamicFaqs = [
    {
      q: `How does WaveForge optimize ${item?.keyword || "this conversion"}?`,
      a: `Our automated media pipeline connects directly to YouTube's streaming cluster, isolating the audio or video track at native bit-depth and formatting it into clean ${format.toUpperCase()} with zero intrusive ads or wait timers.`,
    },
    {
      q: `Is ${title} completely free on this platform?`,
      a: "Yes. All conversions on WaveForge are 100% free with no monthly subscription fees, credit card requirements, or forced registration.",
    },
    {
      q: "Can I use this converter on mobile devices without installing an app?",
      a: "Yes! WaveForge is built as a progressive, modern web application that functions flawlessly within Safari (iOS 15+) and Google Chrome on Android, directly downloading files into your device storage.",
    },
  ];

  return (
    <div>
      <ConverterBox
        defaultFormat={format}
        defaultQuality={format === "mp4" ? "1080" : "320"}
        headline={
          <>
            <span className="capitalize">{title.split("–")[0].trim()}</span>
          </>
        }
        subheadline={
          item?.description ||
          "Direct streaming conversion protocol. Enjoy uncompromised audio fidelity and smooth video playback with zero pop-ups."
        }
      />

      <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-300 text-sm leading-relaxed">
        <h2 className="text-2xl font-bold text-white mb-3">
          Specialized Protocol: {title.split("–")[0].trim()}
        </h2>
        <p className="text-zinc-400 mb-4">
          WaveForge is purpose-built to deliver exact media matches for users searching for high-intent conversion utilities. By eliminating third-party pop-under scripts and client-side trackers, our platform renders up to 5x faster than legacy converter websites while guaranteeing audio integrity.
        </p>

        {item?.usp && (
          <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 text-violet-300 text-xs font-mono">
            Key Feature: {item.usp} · Format: {format.toUpperCase()} · Quality: {quality}
          </div>
        )}
      </div>

      <AudioComparisonTable />
      <FeaturesGrid />
      <FaqSection customFaqs={dynamicFaqs} />
    </div>
  );
}
