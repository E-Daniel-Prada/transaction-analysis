from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from pymongo import MongoClient
import psycopg2

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2023, 1, 1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'mongo_to_postgres_dag',
    default_args=default_args,
    description='Transfer data from MongoDB to PostgreSQL',
    schedule_interval=timedelta(days=1),
)

def fetch_from_mongo():
    client = MongoClient('mongodb://testuser:testpassword123@mongo:27017/')
    db = client['test']
    collection = db['testcollection']
    data = list(collection.find())
    client.close()
    return data

def insert_into_postgres(data):
    conn = psycopg2.connect(
        dbname='transaction_analysis_db',
        user='user',
        password='password',
        host='postgres',
        port='5432'
    )
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
            VALUES (%s, %s, %s)
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