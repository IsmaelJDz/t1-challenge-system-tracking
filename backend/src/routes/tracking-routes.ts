import express from 'express';
import {
  trackInteraction,
  getStats,
  exportData,
} from '../controllers/tracking-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/track', trackInteraction);
router.get('/stats', getStats);
router.get('/export', authMiddleware, exportData);

export default router;
