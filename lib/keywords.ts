export interface KeywordItem {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  volume: number;
  kd: number;
  format: 'mp3' | 'mp4' | 'wav' | 'flac' | 'm4a';
  quality: string;
  device?: string;
  usp?: string;
}

export const TOP_KEYWORDS: KeywordItem[] = [
  {
    slug: 'youtube-to-mp3-320kbps',
    keyword: 'youtube to mp3 320kbps',
    title: 'YouTube to MP3 320kbps – Studio High Fidelity Audio Converter',
    description: 'Convert and download YouTube videos to maximum 320kbps MP3 audio for free. Pure studio bit-depth, no quality loss, and zero pop-up advertisements.',
    volume: 290000,
    kd: 16,
    format: 'mp3',
    quality: '320kbps CBR',
    usp: 'No ads, Maximum bitrate'
  },
  {
    slug: 'youtube-to-wav',
    keyword: 'youtube to wav converter',
    title: 'YouTube to WAV Converter – Uncompressed 16-Bit Lossless PCM Audio',
    description: 'Extract studio-grade uncompressed WAV audio from YouTube videos. Ideal for music producers, video editors, and audiophiles needing zero compression.',
    volume: 368000,
    kd: 44,
    format: 'wav',
    quality: '16-bit 44.1kHz PCM',
    usp: 'Studio uncompressed master'
  },
  {
    slug: 'youtube-to-mp4-1080p',
    keyword: 'youtube to mp4 1080p',
    title: 'YouTube to MP4 1080p 60FPS – High Definition Video Downloader',
    description: 'Download crisp 1080p Full HD & 4K YouTube videos in standard MP4 format. Works on iPhone, Android, Mac, and PC without installing software.',
    volume: 201000,
    kd: 46,
    format: 'mp4',
    quality: '1080p 60FPS / 4K UHD',
    usp: 'Direct MP4 stream, no watermark'
  },
  {
    slug: 'youtube-shorts-downloader',
    keyword: 'youtube shorts to mp3',
    title: 'YouTube Shorts to MP3 & MP4 Downloader – Fast & Vertical Ready',
    description: 'Instant downloader for YouTube Shorts clips. Save audio tracks as 320kbps MP3 or save high-resolution 1080x1920 vertical MP4 videos in seconds.',
    volume: 165000,
    kd: 19,
    format: 'mp3',
    quality: 'Shorts Audio & HD Video',
    usp: 'Instant mobile extraction'
  },
  {
    slug: 'fastest-youtube-to-mp3-no-ads',
    keyword: 'fastest youtube to mp3 converter no ads',
    title: 'Fastest YouTube to MP3 Converter – 100% Ad-Free & Safe',
    description: 'The cleanest online YouTube audio extractor. Experience instant zero-queue conversion with no redirect traps, malicious popups, or required registrations.',
    volume: 12000,
    kd: 12,
    format: 'mp3',
    quality: '320kbps',
    usp: 'Ad-free, Zero malware'
  },
  {
    slug: 'youtube-to-mp3-iphone',
    keyword: 'how to convert youtube to mp3 on iphone without app',
    title: 'Convert YouTube to MP3 on iPhone – Save Directly to Files App',
    description: 'Step-by-step guide and direct browser utility to save YouTube audio directly into your iOS Files or Apple Music library without third-party apps.',
    volume: 18500,
    kd: 18,
    format: 'mp3',
    quality: 'iOS Optimized 256kbps AAC/MP3',
    device: 'iPhone / iOS',
    usp: 'Direct Safari download'
  },
  {
    slug: 'youtube-to-flac-converter',
    keyword: 'youtube to flac converter online',
    title: 'YouTube to FLAC Converter – Free Lossless Audio Extractor',
    description: 'Convert YouTube music streams into audiophile-grade FLAC format with zero dynamic range reduction.',
    volume: 49000,
    kd: 32,
    format: 'flac',
    quality: 'Lossless FLAC',
    usp: 'Preserved frequency response'
  },
  {
    slug: 'youtube-to-m4a-converter',
    keyword: 'youtube to m4a converter',
    title: 'YouTube to M4A Converter – Native AAC Audio for Apple Devices',
    description: 'Extract native YouTube AAC audio streams directly into .m4a format with zero re-encoding loss. Lightweight and battery efficient.',
    volume: 74000,
    kd: 36,
    format: 'm4a',
    quality: 'Native 128-256kbps AAC',
    usp: 'Zero-transcode lossless stream'
  },
  {
    slug: 'youtube-to-mp3-mac',
    keyword: 'safe youtube to mp3 converter for mac',
    title: 'Safe YouTube to MP3 Converter for macOS – Safari & Chrome Ready',
    description: 'No DMG installers, no questionable permissions. Convert YouTube videos to MP3 directly in your browser on macOS Sonoma, Sequoia, and earlier.',
    volume: 9500,
    kd: 14,
    format: 'mp3',
    quality: '320kbps',
    device: 'macOS',
    usp: 'No DMG files, 100% sandboxed'
  },
  {
    slug: 'youtube-podcast-to-mp3',
    keyword: 'convert youtube audio for podcast free',
    title: 'Convert Long YouTube Videos & Podcasts to MP3 – No Duration Limit',
    description: 'Easily convert 1-hour, 2-hour, and 5-hour long YouTube podcast videos, lectures, and DJ sets into compact, clear MP3 files.',
    volume: 13400,
    kd: 17,
    format: 'mp3',
    quality: '192kbps Spoken Word Optimized',
    usp: 'No 20-minute length restriction'
  }
];

export function getKeywordBySlug(slug: string): KeywordItem | undefined {
  return TOP_KEYWORDS.find((k) => k.slug === slug);
}
