# ccs_hacktu
```bash
cd frontend/
npm install
npm run dev
```

Backend:
```bash
cd backend/
python -m venv venv
./venv/scripts/activate
pip install -r requirements.txt
cd hack24
python manage.py migrate
python manage.py runserver 8001
```