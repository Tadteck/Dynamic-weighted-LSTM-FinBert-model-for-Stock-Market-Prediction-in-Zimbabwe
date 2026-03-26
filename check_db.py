import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_prediction.settings')
django.setup()

db_config = settings.DATABASES['default']
print(f"User: {db_config['USER']}")
print(f"Port: {db_config['PORT']}")

import psycopg2
try:
    conn = psycopg2.connect(
        dbname=db_config['NAME'],
        user=db_config['USER'],
        password=db_config['PASSWORD'],
        host=db_config['HOST'],
        port=db_config['PORT']
    )
    print("Connection successful!")
    conn.close()
except Exception as e:
    print(f"Connection failed: {e}")
