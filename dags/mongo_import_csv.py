from airflow import DAG
from airflow.utils.dates import days_ago
from airflow.operators.python_operator import PythonOperator
from pymongo import MongoClient
import pandas as pd

def import_csv_to_mongodb():
    # Conexión a MongoDB
    client = MongoClient('mongodb://root:password@localhost:27017/transaction_analysis_db')
    db = client.base_de_datos
    collection = db.coleccion

    # Ruta al archivo CSV
    csv_file_path = 'test.csv'

    # Lectura del archivo CSV
    df = pd.read_csv(csv_file_path)

    # Iteración sobre las filas del DataFrame y almacenamiento en MongoDB
    for index, row in df.iterrows():
        data = row.to_dict()
        collection.insert_one(data)

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
