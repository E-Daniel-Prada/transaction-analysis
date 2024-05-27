from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from airflow.utils.dates import days_ago
from pymongo import MongoClient
import psycopg2

default_args = {
    'depends_on_past': False,
    'start_date': days_ago(1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
}

dag = DAG(
    'mongo_to_postgres_dag',
    default_args=default_args,
    description='Transfer data from MongoDB to PostgreSQL',
    schedule_interval=timedelta(days=1),
)

def fetch_from_mongo():
    client = MongoClient('mongodb://root:password@mongodb:27017/')
    db = client['test']
    collection = db['testcollection']
    data = list(collection.find())
    client.close()
    return data

def insert_into_postgres(data):
    print("test 1......")
    conn = psycopg2.connect(
        dbname='airflow',
        user='airflow',
        password='airflow',
        host='project-postgres',  # Cambiado de 'localhost' a 'project-postgres'
        port='5432'
    )
    print("test 2....")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactionbi (
            _id VARCHAR PRIMARY KEY,
            Transaction_id VARCHAR NOT NULL
        )
    ''')
    for item in data:
        cursor.execute('''
            INSERT INTO transactionbi (_id, Transaction_id)
            VALUES (%s, %s)
            ON CONFLICT (_id) DO NOTHING
        ''', (str(item['_id']), item['Transaction_id']))
    conn.commit()
    cursor.close()
    conn.close()

def transfer_data(**kwargs):
    data = fetch_from_mongo()
    insert_into_postgres(data)

with dag:
    transfer_task = PythonOperator(
        task_id='transfer_data',
        python_callable=transfer_data,
        provide_context=True,
    )
