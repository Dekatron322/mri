#!/bin/bash
# Build script for Vercel with Git LFS support

set -e

echo "Installing Git LFS..."
apk add --no-cache git-lfs || apt-get update && apt-get install -y git-lfs || brew install git-lfs || true

# Try to initialize LFS
git lfs install 2>/dev/null || true

# Pull LFS files if we're in a git repo
if [ -d .git ]; then
    echo "Pulling Git LFS files..."
    git lfs pull || true
fi

echo "LFS files status:"
ls -la public/*.glb public/*.fbx 2>/dev/null || echo "No .glb/.fbx files found in public/"

echo "Running Next.js build..."
yarn build
