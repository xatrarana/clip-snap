'use client';
import { useState } from 'react';
import { useDownload } from '@/context/DownloadContext';
import { DownloadStatus } from './DownloadStatus';
import { SupportedPlatforms } from './SupportedPlatforms';
import { DownloadType } from '@/types';
import { DownloadForm } from './DownloadFrom';

export default function DownloadPage() {
  const { isProcessing, progress, error, status, startDownload } = useDownload();

  // Local state for inputs
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState<DownloadType>('full');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleDownload = () => {
    startDownload({ url, downloadType });
  };

  const platforms = [
    { name: 'YouTube', supported: true },
    { name: 'Instagram', supported: true },
    { name: 'Facebook', supported: true },
    { name: 'TikTok', supported: true },
    { name: 'Vimeo', supported: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6  py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </div>
      <main className="relative z-10 pt-20 pb-12">
        <DownloadForm
          url={url}
          setUrl={setUrl}
          downloadType={downloadType}
          setDownloadType={setDownloadType}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          onSubmit={handleDownload}
          isProcessing={isProcessing}
          status={status}
          disabled={isProcessing}
        />

        <DownloadStatus progress={progress} status={status} error={error} />

        <SupportedPlatforms platforms={platforms} />
      </main>
    </div>
  );
}
