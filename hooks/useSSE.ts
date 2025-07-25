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

    const es = new EventSource('http://localhost:4500/video/download/status', {
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
