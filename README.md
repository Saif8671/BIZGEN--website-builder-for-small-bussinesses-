# BizGen Workspace

This workspace contains two apps plus shared project docs:

- `frontend/`: Next.js 16 app router UI
- `backend/`: FastAPI backend, database, and migrations
- `docs/`: project documentation and workspace notes

## Recommended Structure

- `frontend/app`: route entrypoints
- `frontend/components`: UI grouped by domain (`landing`, `dashboard`, `builder`, `ui`)
- `frontend/lib` and `frontend/hooks`: client utilities and hooks
- `backend/app/api`: API routes
- `backend/app/services`: business logic
- `backend/app/models` and `backend/app/schemas`: persistence and API contracts
- `backend/app/db`: database config and seed data
- `backend/alembic`: migrations

## Run Locally

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd backend
.\venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8001 --reload
```

The frontend prefers `http://localhost:3001` in development and will automatically move to the next open port if `3001` is already in use.
The backend runs at `http://127.0.0.1:8001`.
