'use client';
import { Download, Image, Scissors, Globe } from 'lucide-react';
import { DownloadType } from '@/types';

interface DownloadFormProps {
  url: string;
  setUrl: (url: string) => void;
  downloadType: DownloadType;
  setDownloadType: (type: DownloadType) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
  status: string | null;
  disabled: boolean;
}

const downloadOptions = [
  {
    id: 'full' as DownloadType,
    icon: <Download className="w-5 h-5" />,
    label: 'Full Video',
    desc: 'Complete video file',
  },
  {
    id: 'thumbnail' as DownloadType,
    icon: <Image className="w-5 h-5" />,
    label: 'Thumbnail',
    desc: 'Video preview image',
  },
  {
    id: 'clip' as DownloadType,
    icon: <Scissors className="w-5 h-5" />,
    label: 'Short Clip',
    desc: 'Custom time range',
  },
];

export function DownloadForm({
  url,
  setUrl,
  downloadType,
  setDownloadType,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSubmit,
  isProcessing,
  status,
  disabled,
}: DownloadFormProps) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Download Your Video
      </h2>

      {/* URL Input */}
      <div className="mb-8">
        <label className="block text-gray-300 text-sm font-medium mb-3">
          Video URL
        </label>
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
            disabled={disabled}
          />
          <Globe className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Download Type Selection */}
      <div className="mb-8">
        <label className="block text-gray-300 text-sm font-medium mb-3">
          Download Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {downloadOptions.map(type => (
            <div
              key={type.id}
              onClick={() => !disabled && setDownloadType(type.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all select-none ${
                downloadType === type.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2 text-white">
                {type.icon}
                <span className="font-medium">{type.label}</span>
              </div>
              <p className="text-sm text-gray-400">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Time Range for Clips */}
      {downloadType === 'clip' && (
        <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-white font-medium mb-4">Time Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                placeholder="00:30"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={disabled}
                required={downloadType === 'clip'}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                placeholder="01:30"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={disabled}
                required={downloadType === 'clip'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Download Button */}
      <button
        type="submit"
        disabled={disabled || !url.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:shadow-none"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{status ?? 'Processing'}</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Start Download</span>
          </>
        )}
      </button>
    </form>
  );
}
