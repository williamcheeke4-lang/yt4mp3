import { MetadataRoute } from "next";
import { TOP_KEYWORDS } from "@/lib/keywords";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rootvogue.com";
  const today = new Date().toISOString().split("T")[0];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/youtube-to-mp3-320kbps`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youtube-to-wav`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youtube-to-mp4-1080p`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youtube-shorts-downloader`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const programmaticPages: MetadataRoute.Sitemap = TOP_KEYWORDS.map((k) => ({
    url: `${baseUrl}/convert/${k.slug}`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: k.kd <= 20 ? 0.8 : 0.7,
  }));

  return [...staticPages, ...programmaticPages];
}
