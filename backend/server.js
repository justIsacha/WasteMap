import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.get('/', (req, res) => {
  res.json({ message: 'WasteMap backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});