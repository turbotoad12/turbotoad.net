#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="turbotoad-net.service"
APP_USER="webuser"
APP_DIR="/home/webuser/turbotoad.net"
NODE_BIN="$(command -v node)"
START_CMD=".output/server/index.mjs"

if [[ -z "${NODE_BIN}" ]]; then
  echo "Error: node binary not found in PATH." >&2
  exit 1
fi

cd "$APP_DIR"

echo "Installing dependencies..."
npm ci
echo "Building Nuxt application..."
npm run build

sudo tee "/etc/systemd/system/${SERVICE_NAME}" > /dev/null <<SERVICE
[Unit]
Description=Nuxt service for turbotoad.net
After=network.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}
ExecStart=${NODE_BIN} ${START_CMD}
Restart=always
RestartSec=5
Environment=NODE_ENV=production
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable --now "$SERVICE_NAME"
