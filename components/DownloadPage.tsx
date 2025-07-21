'use client';
import { useState } from "react";
import { Download, Play, Scissors, Image, Globe, Star, Zap, Shield, ArrowRight, Check } from 'lucide-react';

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState('full');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Simulate processing with progress
  const simulateDownload = () => {
    setIsProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Reset after completion
          setTimeout(() => setProgress(0), 2000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleDownload = () => {
    if (!url.trim()) return;
    simulateDownload();
  };

  const platforms = [
    { name: 'YouTube', supported: true },
    { name: 'Instagram', supported: true },
    { name: 'Facebook', supported: true },
    { name: 'TikTok', supported: false },
    { name: 'Vimeo', supported: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.location.href = '/'}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ClipSnap
            </h1>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>

        {/* Download Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
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
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                {[
                  { id: 'full', icon: <Download className="w-5 h-5" />, label: 'Full Video', desc: 'Complete video file' },
                  { id: 'thumbnail', icon: <Image className="w-5 h-5" />, label: 'Thumbnail', desc: 'Video preview image' },
                  { id: 'clip', icon: <Scissors className="w-5 h-5" />, label: 'Short Clip', desc: 'Custom time range' }
                ].map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setDownloadType(type.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
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
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="00:30"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">End Time</label>
                    <input
                      type="text"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      placeholder="01:30"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {(isProcessing || progress > 0) && (
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Processing...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={!url.trim() || isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Start Download</span>
                </>
              )}
            </button>

            {/* Supported Platforms */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-white font-medium mb-4">Supported Platforms</h3>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className={`px-4 py-2 rounded-xl text-sm flex items-center space-x-2 ${
                      platform.supported
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}
                  >
                    {platform.supported ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                    )}
                    <span>{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

