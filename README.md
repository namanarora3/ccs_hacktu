# ccs_hacktu
```bash
cd frontend/
npm install
npm run dev
```

Backend:
```bash
cd Backend/
python -m venv venv
./venv/scripts/activate #1
pip install -r requirements.txt
cd hack24
python manage.py migrate #when database change
python manage.py runserver 8001 #2
# To create superuser
python manage.py createsuperuser
```