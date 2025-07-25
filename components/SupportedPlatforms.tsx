'use client';

import { Check } from 'lucide-react';

interface SupportedPlatformsProps {
  platforms: { name: string; supported: boolean }[];
}

export function SupportedPlatforms({ platforms }: SupportedPlatformsProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-white/10">
      <h3 className="text-white font-medium mb-4">Supported Platforms</h3>
      <div className="flex flex-wrap gap-3">
        {platforms.map(platform => (
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
  );
}
