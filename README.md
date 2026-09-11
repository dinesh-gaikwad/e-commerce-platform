# 100X Graduation OS — React + Flask + Render

Industry-style major project portfolio with 30 long-form, scrollable pages and 360 data-rich records.

## Stack
- React + Vite
- Flask REST API
- SQLite contact storage
- Gunicorn production server
- Render deployment via `render.yaml`

## Run
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
npm install --prefix frontend
npm run build --prefix frontend
python backend/app.py
```

Open `http://localhost:5000`.

## API
`GET /api/health`, `/api/pages`, `/api/projects`, `/api/skills`, `/api/stats`, `/api/page/<name>`, `POST /api/contact`.

## Deploy
Push to GitHub and create a Render Web Service. The included `render.yaml` contains the build and Gunicorn start commands.
