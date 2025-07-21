import { Download, Play, Scissors, Image, Globe, Star, Zap, Shield, ArrowRight, Check } from 'lucide-react';
import RedirectionButton from "@/components/RedirectionButton";

export default function LandingPage()  {
  const features = [
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multi-Platform Support",
      description: "Download from YouTube, Instagram, Facebook and more platforms with ease."
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Smart Clip Extraction",
      description: "Extract specific portions of videos with precision timing controls."
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Thumbnail Extraction",
      description: "Get high-quality thumbnails and snapshots from any video instantly."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Powered by Edge Functions for ultra-fast processing and downloads."
    }
  ];

  const platforms = [
    { name: 'YouTube', supported: true },
    { name: 'Instagram', supported: true },
    { name: 'Facebook', supported: true },
    { name: 'TikTok', supported: false },
    { name: 'Vimeo', supported: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Download className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ClipSnap
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#platforms" className="text-gray-300 hover:text-white transition-colors">Platforms</a>
            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm text-gray-300 mb-8">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            Next-Gen Video Downloader
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Download Videos
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Like Magic
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Extract full videos, thumbnails, or custom clips from YouTube, Instagram, Facebook and more. 
            Lightning-fast processing powered by edge computing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <RedirectionButton  
          buttonText="Start Downloading"
          href="/download"
          />
            <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200 flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            {[
              { number: '10M+', label: 'Videos Downloaded' },
              { number: '50+', label: 'Supported Platforms' },
              { number: '99.9%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to download, extract, and manage videos from any platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Works With All Major Platforms
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Download from your favorite video platforms with just a URL
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  platform.supported
                    ? 'border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border-gray-500/30 bg-gray-500/10 text-gray-400'
                }`}
              >
                <div className="text-lg font-semibold">{platform.name}</div>
                <div className="text-sm mt-2">
                  {platform.supported ? 'Available' : 'Coming Soon'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of users who trust ClipSnap for their video downloading needs
          </p>
            <RedirectionButton  
            buttonText="Start Downloading now"
            href="/download"
            />
            </div>
            </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ClipSnap
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2024 ClipSnap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
