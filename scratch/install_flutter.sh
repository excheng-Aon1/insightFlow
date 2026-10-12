#!/bin/bash
set -e

ZIP_PATH="/Users/pmsp63/flutter_macos_3.47.7-stable.zip"
URL="https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_3.47.7-stable.zip"

echo "=== 1. Downloading Flutter SDK with Auto-Resume and Retry ==="
curl -L -C - --retry 15 --retry-delay 3 --retry-all-errors -o "$ZIP_PATH" "$URL"

echo "=== 2. Unzipping Flutter SDK to /Users/pmsp63/ ==="
unzip -q -o "$ZIP_PATH" -d /Users/pmsp63/

echo "=== 3. Cleaning up zip archive ==="
rm -f "$ZIP_PATH"

echo "=== 4. Setting up PATH in ~/.zshrc ==="
ZSHRC="/Users/pmsp63/.zshrc"
if ! grep -q 'export PATH="$PATH:$HOME/flutter/bin"' "$ZSHRC" 2>/dev/null; then
  echo '' >> "$ZSHRC"
  echo '# Flutter SDK Path' >> "$ZSHRC"
  echo 'export PATH="$PATH:$HOME/flutter/bin"' >> "$ZSHRC"
fi

echo "=== 5. Verifying Flutter Installation ==="
/Users/pmsp63/flutter/bin/flutter --version

echo "=== Flutter Installed Successfully! ==="

