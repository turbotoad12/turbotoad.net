#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="turbotoad-net.service"
APP_DIR="/home/webuser/turbotoad.net"

cd "$APP_DIR"

echo "Pulling latest changes..."
if ! git pull --ff-only; then
  echo "Error: git pull failed. Check local changes, auth/network, and fast-forward state." >&2
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
  sudo systemctl --no-pager status "$SERVICE_NAME" || true
  exit 1
fi

if ! sudo systemctl is-active --quiet "$SERVICE_NAME"; then
  echo "Error: ${SERVICE_NAME} is not active after restart." >&2
  exit 1
fi

echo "Update completed successfully."
