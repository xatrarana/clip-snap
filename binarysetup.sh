#!/bin/bash
set -e
# Create bin directory if it doesn't exist
mkdir -p ./bin

# Define FFmpeg version and platform
FFMPEG_URL="https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz"

# Download and extract FFmpeg
curl -L "$FFMPEG_URL" -o ffmpeg.tar.xz
tar -xf ffmpeg.tar.xz

# Move the ffmpeg binary to ./bin
FFMPEG_DIR=$(tar -tf ffmpeg.tar.xz | head -1 | cut -f1 -d"/")
mv "$FFMPEG_DIR/ffmpeg" ./bin/ffmpeg

# Make it executable
chmod +x ./bin/ffmpeg

# Cleanup
rm -rf "$FFMPEG_DIR"
rm ffmpeg.tar.xz

echo "✅ FFmpeg downloaded and placed in ./bin"

