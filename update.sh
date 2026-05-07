#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="turbotoad-net.service"
APP_DIR="/home/webuser/turbotoad.net"

cd "$APP_DIR"

git pull --ff-only
npm install
npm run build

sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE_NAME"
