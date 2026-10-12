#!/usr/bin/env bash
# ==============================================================================
# InsightFlow Enterprise — Production Gunicorn + Uvicorn Worker Launcher
# รองรับการรันบน DigitalOcean, AWS (EC2/ECS), GCP (Cloud Run/GCE) และ Render
# ==============================================================================
set -e

cd "$(dirname "$0")"

# คำนวณจำนวน CPU Cores ของเครื่องเซิร์ฟเวอร์อัตโนมัติ: (2 x CPU_CORES) + 1
CPU_CORES=$(python3 -c "import multiprocessing; print(multiprocessing.cpu_count())" 2>/dev/null || echo 2)
DEFAULT_WORKERS=$(( (2 * CPU_CORES) + 1 ))

export WEB_CONCURRENCY="${WEB_CONCURRENCY:-${GUNICORN_WORKERS:-$DEFAULT_WORKERS}}"
export PORT="${PORT:-8000}"
export HOST="${HOST:-0.0.0.0}"

echo "=================================================================="
echo "🚀 InsightFlow Production Cluster (Gunicorn + Uvicorn Workers)"
echo "   • Server Bind     : ${HOST}:${PORT}"
echo "   • Detected Cores  : ${CPU_CORES} vCPU"
echo "   • Uvicorn Workers : ${WEB_CONCURRENCY} Workers"
echo "   • Worker Class    : uvicorn.workers.UvicornWorker"
echo "=================================================================="

if [ -x "./venv/bin/gunicorn" ]; then
  exec ./venv/bin/gunicorn main:app \
    --config gunicorn_conf.py \
    --workers "${WEB_CONCURRENCY}" \
    --worker-class uvicorn.workers.UvicornWorker \
    --bind "${HOST}:${PORT}"
else
  exec gunicorn main:app \
    --config gunicorn_conf.py \
    --workers "${WEB_CONCURRENCY}" \
    --worker-class uvicorn.workers.UvicornWorker \
    --bind "${HOST}:${PORT}"
fi

