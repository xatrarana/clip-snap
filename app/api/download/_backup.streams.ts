import { NextRequest, NextResponse } from 'next/server';
import { spawnSync, spawn } from 'child_process';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import mime from 'mime';
import { Readable } from 'stream';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ success: false, error: 'Missing URL' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const binPath = process.cwd() + '/bin';
  const ytDlpPath = `${binPath}/yt-dlp`;
  const ffmpegPath = `${binPath}/ffmpeg`;

  // Step 1: Get file extension
  const metaResult = spawnSync(ytDlpPath, [
    url,
    '--ffmpeg-location', ffmpegPath,
    '--print', 'ext',
    '--no-playlist',
  ]);

  const fileExt = metaResult.stdout.toString().trim() || 'video';
  console.log("file ext: ",fileExt)
  const mimeType = mime.getType(fileExt) || 'application/octet-stream';
  console.log("miemTUpe:", mimeType)

  try {
    const ytDlp = spawn(ytDlpPath, [
      url,
      '--ffmpeg-location', ffmpegPath,
      '-o', '-', // stream to stdout
    ]);
    const isProduction = process.env.NODE_ENV === 'production';

    ytDlp.stderr.on('data', data => {
        if (!isProduction) {
            const message = data.toString();
            if (message.toLowerCase().includes('error')) {
                console.error('yt-dlp error:', message);
            } else {
                console.log('yt-dlp info:', message);
            }
        }
    });
    ytDlp.on('error', err => {
        if (!isProduction) {
            console.error('yt-dlp error:', err);
        } else {
            console.error('yt-dlp error occurred:', err.message);
        }
    }); 
    // Wrap stdout in a Readable stream
    const stream = new Readable({
      read() {},
    });

    ytDlp.stdout.on('data', chunk => stream.push(chunk));
    ytDlp.stdout.on('end', () => stream.push(null));

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="video.${fileExt}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

