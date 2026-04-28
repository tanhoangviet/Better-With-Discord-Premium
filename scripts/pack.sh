#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist
rm -f dist/Better-with-Discord-Premium-mobile-plugin.zip
(
  cd plugin
  zip -r ../dist/Better-with-Discord-Premium-mobile-plugin.zip .
)

echo "Created dist/Better-with-Discord-Premium-mobile-plugin.zip"
