import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { Readable } from 'stream';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ success: false, error: 'Missing URL' }, { status: 400 });
  }

  const binPath = process.cwd() + '/bin';
  const ytDlpPath = `${binPath}/yt-dlp`;
  const ffmpegPath = `${binPath}/ffmpeg`;

  try {
    const ytDlp = spawn(ytDlpPath, [
      url,
      '--ffmpeg-location', ffmpegPath,
      '-f', 'best[ext=mp4]/best', // stream-friendly format
      '-o', '-', // Output to stdout
    ]);

    const stream = new Readable({
      read() {
        ytDlp.stdout.on('data', chunk => this.push(chunk));
        ytDlp.stdout.on('end', () => this.push(null));
      },
    });

    ytDlp.stderr.on('data', data => console.error('yt-dlp stderr:', data.toString()));
    ytDlp.on('error', err => console.error('yt-dlp error:', err));

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="video.mp4"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

