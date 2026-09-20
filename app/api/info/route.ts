import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function extractVideoId(url: string): string | null {
  // matches standard, share, shorts, embed URLs
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
    /^([\w-]{11})$/
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
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL. Please provide a valid video or shorts link." },
        { status: 400 }
      );
    }

    // Use YouTube official public oEmbed endpoint
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(oembedUrl);

    let title = "YouTube Video";
    let authorName = "Creator";

    if (res.ok) {
      const data = await res.json();
      title = data.title || title;
      authorName = data.author_name || authorName;
    }

    const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const maxResThumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    return NextResponse.json({
      success: true,
      videoId,
      title,
      author: authorName,
      thumbnail,
      maxResThumbnail,
      cleanUrl: `https://www.youtube.com/watch?v=${videoId}`
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not resolve video information" },
      { status: 500 }
    );
  }
}
