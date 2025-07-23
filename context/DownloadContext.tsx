'use client';
import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

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

  const lastProgressUpdateRef = useRef<number>(0);
  let progressInterval: ReturnType<typeof setInterval> | null = null;

  const startDownload = async ({ url, downloadType }: { url: string; downloadType: DownloadType }) => {
      if (!url.trim()) {
          setError('URL cannot be empty');
          setProgress(0);
          return;
      }

      setIsProcessing(true);
      setProgress(10);
      setError(null);
      lastProgressUpdateRef.current = 0;

      try {
          lastProgressUpdateRef.current = 10;

          progressInterval = setInterval(() => {
              setProgress(prev => {
                  const next = Math.min(prev + 5, 90);
                  lastProgressUpdateRef.current = next;
                  return next;
              });
          }, 1000);          
          const endpoint = `/api/download?url=${encodeURIComponent(url)}&type=${downloadType}`;
          const res = await fetch(endpoint);
          //if (!res.ok) throw new Error(`File download failed with status ${res.status}`);

          const data = await res.json();

          if (data.success && data.filename) {
              setProgress(100)
              const downloadUrl = `/api/video/serve?fid=${encodeURIComponent(data.filename)}`;
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
          setProgress(0);
      } finally {
           if (progressInterval) clearInterval(progressInterval);
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

