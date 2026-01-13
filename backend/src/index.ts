import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Las variables de entorno ya se cargan con el flag --env-file del script
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Backend funcionando con TypeScript',
  });
});

// Conexión a MongoDB y arranque del servidor
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
