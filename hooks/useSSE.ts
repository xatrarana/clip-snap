// hooks/useDownloadSSE.ts
import { useEffect } from 'react';
import { mapStatusToProgress } from '@/lib/utils';

interface UseDownloadSSEOptions {
  active: boolean;
  onStatusUpdate: (status: string, progress: number) => void;
}

export function useSSE({ active, onStatusUpdate }: UseDownloadSSEOptions) {
  useEffect(() => {
    if (!active) return;

    const es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/video/download/status`, {
      withCredentials: true,
    });

    es.onmessage = (e) => {
      const status = e.data;
      const progress = mapStatusToProgress(status);
      onStatusUpdate(status, progress);
    };

    es.onerror = (err) => {
      console.warn('SSE error:', err);
      es.close();
    };

    return () => es.close();
  }, [active, onStatusUpdate]);
}
