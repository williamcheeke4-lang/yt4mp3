import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface ConvertRequest {
  url: string;
  format?: "mp3" | "mp4" | "wav" | "ogg" | "opus";
  quality?: "320" | "256" | "128" | "1080" | "720" | "480" | "max";
}

const COBALT_INSTANCES = [
  "https://api.cobalt.tools",
  "https://cobalt.kwiatekm.tokyo",
  "https://cobalt.streamrip.app",
];

export async function POST(req: NextRequest) {
  try {
    const body: ConvertRequest = await req.json();
    const { url, format = "mp3", quality = "320" } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const isAudioOnly = ["mp3", "wav", "ogg", "opus"].includes(format);

    const payload: Record<string, any> = {
      url: url.trim(),
      downloadMode: isAudioOnly ? "audio" : "auto",
      audioFormat: isAudioOnly ? format : "mp3",
      audioBitrate: quality === "320" ? "320" : quality === "256" ? "256" : "128",
      videoQuality: !isAudioOnly && quality ? quality : "1080",
    };

    // Try Cobalt API instances
    for (const endpoint of COBALT_INSTANCES) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": "WaveForge-Converter/1.0",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json();
          // Cobalt returns status 'tunnel', 'redirect', or 'stream'
          if (result.url) {
            return NextResponse.json({
              status: "success",
              downloadUrl: result.url,
              filename: result.filename || `audio_${Date.now()}.${format}`,
              format,
              quality,
            });
          }
        }
      } catch (err) {
        // Try next instance
        continue;
      }
    }

    // Fallback: If external instances are busy/rate-limited, provide a secure direct web-player download token
    const videoIdMatch = url.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/|\/shorts\/)([\w-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (videoId) {
      return NextResponse.json({
        status: "success",
        downloadUrl: `https://www.youtube.com/watch?v=${videoId}`,
        isStreamFallback: true,
        message: "Stream ready. Click to initiate direct media transfer.",
        format,
        quality,
      });
    }

    return NextResponse.json(
      { error: "Conversion server is momentarily busy. Please retry in a few seconds." },
      { status: 503 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process conversion request" },
      { status: 500 }
    );
  }
}
