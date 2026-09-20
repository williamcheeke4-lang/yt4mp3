import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const streamUrl = searchParams.get("url");
  const title = searchParams.get("title") || "download";
  const format = searchParams.get("format") || "mp3";

  if (!streamUrl) {
    return NextResponse.json({ error: "Missing stream URL" }, { status: 400 });
  }

  try {
    const upstreamRes = await fetch(streamUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://ytmp3.gl/",
        "Origin": "https://ytmp3.gl",
      },
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      return NextResponse.json(
        { error: "Failed to stream media from source" },
        { status: upstreamRes.status }
      );
    }

    const safeTitle = title.replace(/[^a-zA-Z0-9_\-\. ]/g, "_").trim() || "audio";
    const filename = `${safeTitle}.${format}`;
    const contentType = format === "mp4" ? "video/mp4" : "audio/mpeg";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    
    const contentLength = upstreamRes.headers.get("Content-Length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new Response(upstreamRes.body, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal streaming error" },
      { status: 500 }
    );
  }
}
