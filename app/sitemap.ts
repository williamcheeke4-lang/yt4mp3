import { MetadataRoute } from "next";
import { TOP_KEYWORDS } from "@/lib/keywords";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://waveforge.app";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/youtube-to-mp3-320kbps`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youtube-to-wav`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youtube-to-mp4-1080p`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/youtube-shorts-downloader`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const programmaticPages: MetadataRoute.Sitemap = TOP_KEYWORDS.map((k) => ({
    url: `${baseUrl}/convert/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...programmaticPages];
}
