import { NextRequest, NextResponse } from "next/server";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
    /^([\w-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.trim().match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, format = "mp3", quality = "320" } = body;

    if (!url) {
      return NextResponse.json({ error: "Please enter a valid YouTube link" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL. Please provide a valid video or Shorts link." },
        { status: 400 }
      );
    }

    const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Map requested format to API format
    let apiFormat = "mp3";
    if (format === "mp4") {
      apiFormat = quality === "720" ? "720" : quality === "480" ? "480" : "1080";
    } else if (format === "wav") {
      apiFormat = "wav";
    } else if (format === "flac") {
      apiFormat = "flac";
    } else if (format === "m4a") {
      apiFormat = "m4a";
    } else {
      apiFormat = "mp3";
    }

    const apiUrl = `https://loader.to/ajax/download.php?format=${apiFormat}&url=${encodeURIComponent(cleanUrl)}`;

    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Converter service is temporarily busy. Please retry in a few moments." },
        { status: 502 }
      );
    }

    const data = await res.json();

    if (!data.success) {
      return NextResponse.json(
        { error: data.message || "Failed to initialize conversion for this video." },
        { status: 400 }
      );
    }

    const progressUrl = data.progress_url;
    const title = data.title || "YouTube Media";

    // Check if download URL is ready immediately
    if (progressUrl) {
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const pollRes = await fetch(progressUrl, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
            cache: "no-store",
          });

          if (pollRes.ok) {
            const pdata = await pollRes.json();
            if (pdata.download_url) {
              return NextResponse.json({
                status: "ready",
                downloadUrl: pdata.download_url,
                title: pdata.title || title,
                format,
                quality,
              });
            }
          }
        } catch {
          // continue to next poll
        }
      }

      // If still processing after quick check, let frontend poll
      return NextResponse.json({
        status: "processing",
        progressUrl,
        title,
        format,
        quality,
      });
    }

    return NextResponse.json(
      { error: "Could not generate download link. Please retry." },
      { status: 500 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Conversion request failed" },
      { status: 500 }
    );
  }
}
