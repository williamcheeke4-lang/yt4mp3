import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

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

const COMMON_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": "https://ytmp3.gl/",
  "Origin": "https://ytmp3.gl",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, format = "mp3" } = body;

    if (!url) {
      return NextResponse.json({ error: "Please enter a valid YouTube URL" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL. Please provide a valid video or Shorts link." },
        { status: 400 }
      );
    }

    const targetFormat = format === "mp4" ? "mp4" : "mp3";
    const initUrl = `https://fancy-sea-5d3d.holy-breeze-fec5.workers.dev/?m=i&v=${videoId}&f=${targetFormat}&_=${Date.now()}`;

    const initRes = await fetch(initUrl, { headers: COMMON_HEADERS });
    if (!initRes.ok) {
      return NextResponse.json(
        { error: "Conversion server is temporarily busy. Please retry." },
        { status: 502 }
      );
    }

    let data = await initRes.json();

    if (data.error && data.error > 0) {
      return NextResponse.json(
        { error: `Extraction error code: ${data.error}. Video may be private or restricted.` },
        { status: 400 }
      );
    }

    // If status is 'progress', poll the progress endpoint up to 6 times
    if (data.status === "progress" && data.progressURL) {
      const progressUrl = data.progressURL;
      for (let i = 0; i < 6; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        try {
          const pollRes = await fetch(progressUrl, { headers: COMMON_HEADERS });
          if (pollRes.ok) {
            const pdata = await pollRes.json();
            if (pdata.status === "download" || pdata.progress === 3) {
              data.status = "download";
              if (pdata.title) data.title = pdata.title;
              break;
            }
          }
        } catch {
          // continue polling
        }
      }
    }

    if (data.downloadURL) {
      const title = data.title || "YouTube Audio";
      // Point directly to our streaming proxy endpoint
      const proxyDownloadUrl = `/api/download?url=${encodeURIComponent(
        data.downloadURL
      )}&title=${encodeURIComponent(title)}&format=${targetFormat}`;

      return NextResponse.json({
        status: "success",
        downloadUrl: proxyDownloadUrl,
        title,
        format: targetFormat,
      });
    }

    return NextResponse.json(
      { error: "Could not process media stream. Please verify the URL and try again." },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal conversion error occurred." },
      { status: 500 }
    );
  }
}
