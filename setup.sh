#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="turbotoad-net.service"
APP_USER="webuser"
APP_DIR="/home/webuser/turbotoad.net"

cd "$APP_DIR"

npm install
npm run build

sudo tee "/etc/systemd/system/${SERVICE_NAME}" > /dev/null <<SERVICE
[Unit]
Description=Nuxt service for turbotoad.net
After=network.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}
ExecStart=/usr/bin/env node .output/server/index.mjs
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable --now "$SERVICE_NAME"
