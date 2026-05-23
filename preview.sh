#!/bin/sh
set -a
[ -f .env.local ] && . .env.local
set +a
sed "s/__MICROCMS_SERVICE_DOMAIN__/${MICROCMS_SERVICE_DOMAIN}/g; s/__MICROCMS_API_KEY__/${MICROCMS_API_KEY}/g" index.html > /tmp/portfolio-preview.html && open /tmp/portfolio-preview.html
