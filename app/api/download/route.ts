import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { v4 as uuid } from 'uuid'; 
import { extractYtDlpError } from '@/lib/utils';

const execAsync = promisify(exec);

async function getVideoExtension(ytDlpPath: string, ffmpegPath: string, url: string): Promise<string> {

  const command = `"${ytDlpPath}" --ffmpeg-location "${ffmpegPath}" --skip-download --print filename -o "%(ext)s" "${url}"`;
  
  const { stdout, stderr } = await execAsync(command);
  if (stderr) console.warn('yt-dlp stderr:', stderr);

  const ext = stdout.trim();
  return ext || 'mp4'; 
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ success: false, error: 'Missing URL' }, { status: 400 });
  }

  try {
    const binPath = path.join(process.cwd(), 'bin');
    const ytDlpPath = path.join(binPath, 'yt-dlp');
    const ffmpegPath = path.join(binPath, 'ffmpeg');
    const downloadDir = path.join(process.cwd(), 'tmp');

    // Ensure downloads folder exists
    await fs.mkdir(downloadDir, { recursive: true });
    
   const ext = await getVideoExtension(ytDlpPath, ffmpegPath, url); 
   const uniqueId = `video-${uuid()}`; 
   const filename = `${uniqueId}.${ext}`;

    const outputTemplate = path.join(downloadDir, `${uniqueId}.%(ext)s`);

    const command = `"${ytDlpPath}" --ffmpeg-location "${ffmpegPath}" -o "${outputTemplate}" "${url}"`;
    
    const { stdout, stderr } = await execAsync(command);

    if (stdout) console.log('yt-dlp output:', stdout);

    if (stderr && process.env.NODE_ENV !== 'production') {
        console.warn('yt-dlp stderr:', stderr);
    } 

    return NextResponse.json({ success: true, filename });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') console.error('yt-dlp error:', error.message);
    const shortError = extractYtDlpError(error.message) ?? "Something went wrong!!";
    return NextResponse.json({ success: false, error: shortError }, { status: 500 });
  }
}

