import express, { type Request, type Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth-routes.js';
import trackingRoutes from './routes/tracking-routes.js';
import { setupSwagger } from './swagger.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('✅ Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

app.use(cors());
app.use(express.json());

setupSwagger(app);

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

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar estado del servidor
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Backend funcionando
 */
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
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Servidor corriendo en http://localhost:${PORT}`
      );
      console.log('🔌 Socket.IO listo para conexiones');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
