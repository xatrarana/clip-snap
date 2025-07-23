// types.ts (or you can place this in the same file)
export type DownloadType = 'full' | 'thumbnail' | 'clip';

export interface DownloadJobData {
  url: string;
  downloadType: DownloadType;
  startTime?: string;  // Required only for clips
  endTime?: string;    // Required only for clips
}

