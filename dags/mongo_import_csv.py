from airflow import DAG
from airflow.utils.dates import days_ago
from airflow.operators.python_operator import PythonOperator
from pymongo import MongoClient
import pandas as pd

def import_csv_to_mongodb():
    # Conexión a MongoDB
    client = MongoClient('mongodb://root:password@mongodb:27017/')
    db = client['test']
    collection = db['testcollection']
    df = pd.read_csv('/usr/local/airflow/data/test.csv')
    data = df.to_dict(orient='records')
    collection.insert_many(data)
    client.close()

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': days_ago(1),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
}

with DAG(
    'import_csv_to_mongodb',
    default_args=default_args,
    description='Import CSV to MongoDB',
    schedule_interval=None,  # Puedes configurar el intervalo de ejecución según tus necesidades
    catchup=False,
) as dag:

    import_task = PythonOperator(
        task_id='import_csv_to_mongodb_task',
        python_callable=import_csv_to_mongodb,
    )

    import_task
