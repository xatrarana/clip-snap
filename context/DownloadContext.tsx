'use client';
import { useSSE } from '@/hooks/useSSE';
import { downloadVideo, mapStatusToProgress } from '@/lib/utils';
import React, { createContext, useContext, useState, ReactNode, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

type DownloadType = 'full' | 'clip' | 'thumbnail';

interface DownloadContextProps {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  startDownload: (args: { url: string; downloadType: DownloadType }) => Promise<void>;
  status: string | null;
}

const DownloadContext = createContext<DownloadContextProps | undefined>(undefined);

interface DownloadProviderProps {
  children: ReactNode;
}

export const DownloadProvider: React.FC<DownloadProviderProps> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sseActive, setSseActive] = useState<boolean>(false);

 const handleStatusUpdate = useCallback((msg: string, progressValue: number) => {
    setStatus(msg);
    setProgress(progressValue);
  }, []);

  useSSE({ active: sseActive, onStatusUpdate: handleStatusUpdate });

  const startDownload = async ({ url, downloadType }: { url: string; downloadType: DownloadType }) => {
    if (!url.trim()) {
      setError('URL cannot be empty');
      setProgress(0);
      return;
    }

    setIsProcessing(true);
    setProgress(5);
    setError(null);
    setSseActive(true);

    try {

       const data = await downloadVideo(url, downloadType);

      if (data.success && data.filename) {
        setProgress(100)
        const downloadUrl = `http://localhost:4500/video/stream?fid=${encodeURIComponent(data.filename)}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`${data.filename} downloaded`);
      }
      else {

        throw new Error(data?.error || 'Unknown error occurred.');
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (process.env.NODE_ENV === 'development') console.error(message);
      toast.error(message)
      setError(message);
    } finally {
      setIsProcessing(false);
      setStatus("");
      setProgress(0)
    }
  };


  return (
    <DownloadContext.Provider
      value={{ isProcessing, progress, error, startDownload, status }}
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

