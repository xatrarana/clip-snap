export function mapStatusToProgress(message: string): number {
  const lower = message.toLowerCase();

  if (lower.includes('fetching')) return 10;
  if (lower.includes('preparing')) return 25;
  if (lower.includes('building')) return 40;
  if (lower.includes('starting download')) return 60;
  if (lower.includes('download complete')) return 85;
  if (lower.includes('finalizing')) return 95;
  if (lower.includes('ready')) return 100;
  if (lower.includes('error')) return 0;

  return 5; // fallback for unknown or very early state
}
export async function downloadVideo(url: string, downloadType: string): Promise<{ success: boolean; filename?: string; error?: string }> {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/video/download?url=${encodeURIComponent(url)}&type=${downloadType}`;
  const res = await fetch(endpoint, { credentials: 'include' });

  return res.json();
}
