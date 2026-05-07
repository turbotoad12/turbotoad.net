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
if ! npm ci; then
  echo "Error: failed to install dependencies." >&2
  exit 1
fi

echo "Building Nuxt application..."
if ! npm run build; then
  echo "Error: failed to build Nuxt application." >&2
  exit 1
fi

echo "Restarting service..."
if ! sudo systemctl restart "$SERVICE_NAME"; then
  echo "Error: failed to restart ${SERVICE_NAME}." >&2
  exit 1
fi

echo "Update completed successfully."
