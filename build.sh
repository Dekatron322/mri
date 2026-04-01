#!/bin/bash
# Build script for Vercel with Git LFS support

set -e

echo "Installing Git LFS..."
apk add --no-cache git-lfs || apt-get update && apt-get install -y git-lfs || brew install git-lfs || true

# Try to initialize LFS
git lfs install 2>/dev/null || true

echo "Checking Git LFS files before pull:"
head -c 100 public/MRI.glb 2>/dev/null || echo "Cannot read MRI.glb"
echo ""
echo "Git LFS version:"
git lfs version 2>/dev/null || echo "Git LFS not available"
echo ""

# Pull LFS files if we're in a git repo
if [ -d .git ]; then
    echo "Pulling Git LFS files..."
    git lfs install
    git lfs pull || echo "LFS pull failed, checking if files are already present..."
fi

echo "LFS files status after pull:"
ls -la public/*.glb public/*.fbx 2>/dev/null || echo "No .glb/.fbx files found in public/"
echo ""
echo "Checking MRI.glb file type:"
file public/MRI.glb 2>/dev/null || echo "file command not available"
echo "First 20 bytes of MRI.glb (should start with 'glTF' for binary):"
head -c 20 public/MRI.glb 2>/dev/null || echo "Cannot read file"

echo "Running Next.js build..."
yarn build
