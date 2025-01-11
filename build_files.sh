python3.9 -m venv venv
source venv/bin/activate
pip install django
pip install requests
python3.9 core/manage.py collectstatic --noinput