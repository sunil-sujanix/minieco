# Mini E‑Commerce (Django REST + React + PostgreSQL)

A minimal full‑stack e‑commerce app with:
- Django REST Framework + JWT auth
- PostgreSQL
- React (Vite) frontend
- Cart, checkout (mock payment), orders, admin owner edit/delete, Celery email
- Docker setup (backend, db, redis, celery)

> NOTE: Stripe is mocked in this starter – replace with real Stripe later if needed.

## Quickstart (Local)

### 1) Backend
```bash
cd backend
python -m venv .venv && . .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .example.env .env   # update values
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
celery -A ecommerce worker -l info  # in another terminal (requires Redis)
```

### 2) Frontend
```bash
cd frontend
npm i
cp .env.example .env
npm run dev  # opens http://localhost:5173
```

## Docker (Backend + DB + Redis + Celery)
```bash
docker compose up --build
```
- Backend: http://localhost:8000
- DB: Postgres on port 5432
- Redis: 6379

(Frontend runs with `npm run dev` separately.)

## API Summary
- Auth: `/api/auth/register/`, `/api/auth/token/`, `/api/auth/token/refresh/`
- Products: `/api/products/` (list/detail), owner or admin can edit/delete
- Categories: `/api/categories/`
- Cart: `/api/cart/` (list/add/update/remove by item id)
- Orders: `/api/orders/` (create from cart, list by user; admin sees all)

A Postman collection is included at `postman_collection.json` in the backend.

## Tests
Run from `backend`:
```bash
pytest
# or:
python manage.py test
```

## Folder Structure
```
miniecom/
  backend/ ... Django + DRF + Celery
  frontend/ ... React + Vite
```
