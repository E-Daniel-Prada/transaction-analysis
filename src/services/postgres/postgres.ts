import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

// Configuración de la conexión a la base de datos utilizando variables de entorno
const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
};

export default async function connectToDatabase(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const query = `
      SELECT * FROM transaction_analysis_db;
    `;
    const client = new Client(dbConfig);

    try {
      await client.connect();
      const result = await client.query(query);
      await client.end();
      
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
