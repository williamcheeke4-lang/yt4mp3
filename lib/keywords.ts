import keywordsData from "./keywords_data.json";

export interface KeywordItem {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  volume: number;
  kd: number;
  format: "mp3" | "mp4" | "wav" | "flac" | "m4a";
  quality: string;
  device?: string;
  usp?: string;
  cluster?: string;
}

export const TOP_KEYWORDS: KeywordItem[] = keywordsData as KeywordItem[];

export function getKeywordBySlug(slug: string): KeywordItem | undefined {
  return TOP_KEYWORDS.find((k) => k.slug === slug);
}
