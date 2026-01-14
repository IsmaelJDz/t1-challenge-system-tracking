import express from 'express';
import {
  trackInteraction,
  getStats,
  exportData,
} from '../controllers/tracking-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/components/track:
 *   post:
 *     summary: Registrar interacción de componente
 *     tags: [Tracking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - component
 *               - action
 *             properties:
 *               component:
 *                 type: string
 *                 example: Button
 *                 enum: [Button, Input, Card, Modal]
 *               variant:
 *                 type: string
 *                 example: primary
 *               action:
 *                 type: string
 *                 example: click
 *               metadata:
 *                 type: object
 *                 example: { "name": "submit-button", "page": "/dashboard" }
 *     responses:
 *       201:
 *         description: Evento registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrackingEvent'
 *       400:
 *         description: Faltan campos requeridos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/track', trackInteraction);

/**
 * @swagger
 * /api/components/stats:
 *   get:
 *     summary: Obtener estadísticas de interacciones
 *     tags: [Tracking]
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stats'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/stats', getStats);

/**
 * @swagger
 * /api/components/export:
 *   get:
 *     summary: Exportar datos en formato CSV
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo CSV generado exitosamente
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               example: "_id,component,variant,action,createdAt\n507f1f77bcf86cd799439011,Button,primary,click,2026-01-14T10:30:00.000Z"
 *       401:
 *         description: No autenticado o token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No hay datos para exportar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/export', authMiddleware, exportData);

export default router;
