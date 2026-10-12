web: cd backend && gunicorn main:app --config gunicorn_conf.py --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:${PORT:-8000}
