import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ success: false, error: 'Missing fid parameter' }, { status: 400 });
  }

  const tmpDir = path.join(process.cwd(), 'tmp');
  const filePath = path.join(tmpDir, fid);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
  }

  const ext = path.extname(fid).substring(1);
  const mimeType = getMimeType(ext);

  const fileStream = fs.createReadStream(filePath);

   fileStream.on('close', () => {
    fs.unlink(filePath, err => {
      if (err) console.error(`Failed to delete file ${filePath}`, err);
      else console.log(`Deleted file ${filePath}`);
    });
  });

  return new NextResponse(fileStream as any, {
    headers: {
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fid}"`,
      'Cache-Control': 'no-store',
    },
  });
}

function getMimeType(ext: string) {
  const map: Record<string, string> = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    mkv: 'video/x-matroska',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
  };
  return map[ext.toLowerCase()] || 'application/octet-stream';
}

