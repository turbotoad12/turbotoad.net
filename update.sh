#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="turbotoad-net.service"
APP_DIR="/home/webuser/turbotoad.net"

cd "$APP_DIR"

echo "Pulling latest changes..."
if ! git pull --ff-only; then
  echo "Error: git pull failed. Resolve merge state manually and retry." >&2
  exit 1
fi

echo "Installing dependencies..."
npm install
echo "Building Nuxt application..."
npm run build

sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE_NAME"
