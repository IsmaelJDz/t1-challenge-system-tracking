import express from 'express';
import {
  trackInteraction,
  getStats,
  exportData,
} from '../controllers/tracking-controller.js';
import { protect } from '../middleware/auth-middleware.js'; // Importamos el guardia

const router = express.Router();

router.post('/track', trackInteraction); // Público
router.get('/stats', getStats); // Público
router.get('/export', protect, exportData); // PROTEGIDO 🔒

export default router;
