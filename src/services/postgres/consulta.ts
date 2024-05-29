import { Client } from 'pg';

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
};

export async function getPayments(query: string) {
  

  const client = new Client(dbConfig);

  try {
    console.log('env', dbConfig);
    
    await client.connect();
    console.log('conexion con bd');
    
    const result = await client.query(query);

    await client.end();
    console.log('result.row', result);
    
    return result.rows;

  } catch (error) {
    console.error('Error conectando a la base de datos:', error.message);
    throw new Error('Error conectando a la base de datos: ' + error.message);
  }
}
