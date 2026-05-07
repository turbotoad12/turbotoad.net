#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="turbotoad-net.service"
APP_USER="webuser"
APP_DIR="/home/webuser/turbotoad.net"
NODE_BIN="$(command -v node)"
START_CMD="${APP_DIR}/.output/server/index.mjs"

if [[ -z "${NODE_BIN}" ]]; then
  echo "Error: node binary not found in PATH." >&2
  exit 1
fi

if ! cd "$APP_DIR"; then
  echo "Error: failed to change directory to ${APP_DIR}." >&2
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

if [[ ! -f "${START_CMD}" ]]; then
  echo "Error: expected server entrypoint not found at ${START_CMD}." >&2
  exit 1
fi

if ! sudo tee "/etc/systemd/system/${SERVICE_NAME}" > /dev/null <<SERVICE
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
PrivateTmp=true
NoNewPrivileges=true
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE
then
  echo "Error: failed to write /etc/systemd/system/${SERVICE_NAME}." >&2
  exit 1
fi

if ! sudo systemctl daemon-reload; then
  echo "Error: failed to reload systemd daemon." >&2
  exit 1
fi

if ! sudo systemctl enable --now "$SERVICE_NAME"; then
  echo "Error: failed to enable/start ${SERVICE_NAME}." >&2
  exit 1
fi

echo "Setup completed successfully. ${SERVICE_NAME} is enabled and running."
