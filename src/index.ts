import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../environment/.env') });
import mysql from 'mysql2/promise';
import connection from './providers/database'; // Ajusta la ruta según tu estructura de carpetas


const app = express();
const port = 3000;

// SETTINGS 
/**
 * origin : define el origen de donde esta permitido recibir peticiones (FRONT)
 * credentials : permite tener credenciales en las cookies
 */
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());


// ROUTES

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  const testConnection = async (): Promise<void> => {
    try {
      const [rows]: any[] = await connection.query('SELECT 1 + 1 AS result');
      console.log('Connection successful:', rows[0].result);
      console.log('Connection successful:', rows[0].result === 2);
    } catch (error: any) {
      console.error('Connection failed:', error.message);
    }
  };
  testConnection();

});

app.on('error', (err: any) => {
  console.error('Error starting server:', err);
});
