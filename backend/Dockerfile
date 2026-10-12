# ==============================================================================
# InsightFlow Enterprise Production Dockerfile (AWS ECS / GCP Cloud Run / DO)
# รันผ่าน Gunicorn Master Process + Uvicorn ASGI Workers
# ==============================================================================
FROM python:3.13-slim

WORKDIR /app

# ติดตั้ง System Libraries สำหรับ psycopg2 (PostgreSQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chmod +x start_prod.sh

ENV HOST=0.0.0.0
ENV PORT=8000
ENV WEB_CONCURRENCY=4

EXPOSE 8000

CMD ["gunicorn", "main:app", "--config", "gunicorn_conf.py", "--worker-class", "uvicorn.workers.UvicornWorker"]

