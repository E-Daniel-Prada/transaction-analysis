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
    'load_transactions_by_day_in_postgresql',
    default_args=default_args,
    description='Transfer data from MongoDB to PostgreSQL',
    schedule_interval=timedelta(days=1),
)

def fetch_from_mongo():
    client = MongoClient('mongodb://root:password@mongodb:27017/')
    db = client['test']
    collection = db['testcollection']
    pipeline = [
        {
            '$match': {
                'dateCreatedPay': { '$type': 'date' }
            }
        },
        {
            '$project': {
                'transaction_date': {
                    '$dateToString': { 'format': '%Y-%m-%d', 'date': '$dateCreatedPay' }
                }
            }
        },
        {
            '$group': {
                '_id': '$transaction_date',
                'total_transactions': { '$sum': 1 }
            }
        },
        {
            '$sort': { '_id': 1 }
        }
    ]
    data = list(collection.aggregate(pipeline))
    client.close()
    return data

def fetch_from_mongo():
    client = MongoClient('mongodb://root:password@mongodb:27017/')
    db = client['test']
    collection = db['testcollection']
    pipeline = [
        {
            '$addFields': {
                'dateCreatedPay': {
                    '$cond': {
                        'if': { '$not': [{ '$eq': [{ '$type': '$dateCreatedPay' }, 'date'] }] },
                        'then': { '$dateFromString': { 'dateString': '$dateCreatedPay' } },
                        'else': '$dateCreatedPay'
                    }
                }
            }
        },
        {
            '$match': {
                'dateCreatedPay': { '$type': 'date' }
            }
        },
        {
            '$project': {
                'transaction_date': {
                    '$dateToString': { 'format': '%Y-%m-%d', 'date': '$dateCreatedPay' }
                }
            }
        },
        {
            '$group': {
                '_id': '$transaction_date',
                'total_transactions': { '$sum': 1 }
            }
        },
        {
            '$sort': { '_id': 1 }
        }
    ]
    data = list(collection.aggregate(pipeline))
    client.close()
    return data

def insert_into_postgres(data):
    conn = psycopg2.connect(
        dbname='airflow',
        user='airflow',
        password='airflow',
        host='project-postgres',  # Cambiado de 'localhost' a 'project-postgres'
        port='5432'
    )
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS aggregated_transactions (
            transaction_date DATE PRIMARY KEY,
            total_transactions INT NOT NULL,
            mongo_id VARCHAR NOT NULL
        )
    ''')
    for item in data:
        cursor.execute('''
            INSERT INTO aggregated_transactions (transaction_date, total_transactions, mongo_id)
            VALUES (%s, %s, %s)
            ON CONFLICT (transaction_date) DO NOTHING
        ''', (item['_id'], item['total_transactions'], str(item['_id'])))
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
