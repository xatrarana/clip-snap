'use client';

interface DownloadStatusProps {
  progress: number;
  status: string | null;
  error: string | null;
}

export function DownloadStatus({ progress, status, error }: DownloadStatusProps) {
  if (error) {
    return (
      <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-700/30 rounded-xl text-red-300 text-center">
        {error}
      </div>
    );
  }

  if (progress > 0) {
    return (
      <div className="max-w-4xl mx-auto mb-8">
        
        <div className="w-full bg-white/10 rounded-full h-3 mt-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return null;
}
