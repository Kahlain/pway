#!/bin/sh
# Use Railway's PORT environment variable, default to 8080 if not set
PORT=${PORT:-8080}
echo "Starting server on port $PORT"
exec python3 -m http.server $PORT --bind 0.0.0.0

