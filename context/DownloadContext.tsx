'use client';
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';

type DownloadType = 'full' | 'clip' | 'thumbnail';

interface DownloadContextProps {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  startDownload: (args: { url: string; downloadType: DownloadType }) => Promise<void>;
}

const DownloadContext = createContext<DownloadContextProps | undefined>(undefined);

interface DownloadProviderProps {
  children: ReactNode;
}

export const DownloadProvider: React.FC<DownloadProviderProps> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // To throttle progress updates
  const lastProgressUpdateRef = useRef<number>(0);

  const startDownload = async ({ url, downloadType }: { url: string; downloadType: DownloadType }) => {
    if (!url.trim()) {
      setError('URL cannot be empty');
      setProgress(0);
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    lastProgressUpdateRef.current = 0;

    try {
       const endpoint = `/api/download?url=${encodeURIComponent(url)}&type=${downloadType}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`File download failed with status${res.status}`);
      const contentLength = res.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : undefined;

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body found');

      let loaded = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
              chunks.push(value);
              loaded += value.length;

              if (total) {
                  // Throttle progress updates: update at most every 100ms or on progress change
                  const currentProgress = Math.round((loaded / total) * 100);
                  const now = Date.now();

                  if (
                      currentProgress !== lastProgressUpdateRef.current &&
                      (now - lastProgressUpdateRef.current > 100 || currentProgress === 100)
                  ) {
                      lastProgressUpdateRef.current = currentProgress;
                      setProgress(currentProgress);
                  }
              }
          }
      }

      if (!total) {
          setProgress(100);
      }

      const blob = new Blob(chunks, { type: 'video/mp4' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `video-${Date.now()}.mp4`; // or get filename from headers later
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(message);
        setError(message);
        setProgress(0);
    } finally {
        setIsProcessing(false);
    }

  };

  return (
    <DownloadContext.Provider
      value={{ isProcessing, progress, error, startDownload }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = (): DownloadContextProps => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
};

