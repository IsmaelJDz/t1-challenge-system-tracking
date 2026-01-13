import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import trackingRoutes from './routes/tracking-routes.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

const app = express();

app.use(cors());
app.use(express.json());

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/components', trackingRoutes);
// -------------

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

const startServer = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error(
        'Falta la variable MONGO_URI en el archivo .env'
      );
    }
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor corriendo en http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
