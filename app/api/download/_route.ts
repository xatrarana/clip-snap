import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ success: false, error: 'Missing URL' }, { status: 400 });
  }

  try {
    const binPath = path.join(process.cwd(), 'bin');
    const ytDlpPath = path.join(binPath, 'yt-dlp');
    const ffmpegPath = path.join(binPath, 'ffmpeg');
    const downloadDir = path.join(process.cwd(), 'public', 'downloads');

    // Ensure downloads folder exists
    await fs.mkdir(downloadDir, { recursive: true });

    // Generate a timestamped filename like "20250722184321"
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const outputTemplate = path.join(downloadDir, `${timestamp}.%(ext)s`);

    const command = `"${ytDlpPath}" --ffmpeg-location "${ffmpegPath}" -o "${outputTemplate}" "${url}"`;
    const { stdout, stderr } = await execAsync(command);

    console.log('yt-dlp stdout:', stdout);
    if (stderr) console.error('yt-dlp stderr:', stderr);

    // We don't know the extension (could be mp4/webm), so find the created file
    const extensions = ['mp4', 'webm', 'mkv'];
    let foundFilename: string | null = null;

    for (const ext of extensions) {
      const fullPath = path.join(downloadDir, `${timestamp}.${ext}`);
      try {
        await fs.access(fullPath);
        foundFilename = `${timestamp}.${ext}`;
        break;
      } catch {
        continue;
      }
    }

    if (!foundFilename) {
      throw new Error('Download succeeded but no output file found.');
    }

    return NextResponse.json({ success: true, filename: foundFilename });
  } catch (error: any) {
    console.error('yt-dlp error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

