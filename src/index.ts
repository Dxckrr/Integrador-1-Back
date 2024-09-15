import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../environment/.env') });
import authRouter from './routes/auth/auth.routes';
import appointmentRouter from './routes/core/appointment.routes';


/**
 * Sanavit´s Backend for PI 1 
 * @author Sanavit
 */
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
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentRouter);


app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

app.on('error', (err: any) => {
  console.error('Error starting server:', err);
});
