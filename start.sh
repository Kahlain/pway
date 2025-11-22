#!/bin/sh
PORT=${PORT:-8000}
exec python3 -m http.server $PORT --bind 0.0.0.0

