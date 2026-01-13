import { type Request, type Response } from 'express';
import { Tracking } from '../models/tracking.js';
import { Parser } from 'json2csv';

// @desc    Guardar una interacción (Público)
// @route   POST /api/components/track
export const trackInteraction = async (
  req: Request,
  res: Response
) => {
  try {
    const { component, variant, action, metadata } = req.body;

    // Validaciones básicas
    if (!component || !action) {
      return res.status(400).json({
        message: 'Faltan campos requeridos (component, action)',
      });
    }

    const newTrack = await Tracking.create({
      component,
      variant,
      action,
      metadata,
    });

    res.status(201).json(newTrack);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al guardar tracking', error });
  }
};

// @desc    Ver estadísticas básicas (Público)
// @route   GET /api/components/stats
export const getStats = async (req: Request, res: Response) => {
  try {
    // Agregación de Mongo para contar por componente
    const stats = await Tracking.aggregate([
      {
        $group: {
          _id: '$component',
          count: { $sum: 1 },
          actions: { $push: '$action' }, // Opcional: ver qué acciones hubo
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener estadísticas', error });
  }
};

// @desc    Exportar a CSV (Privado - Requiere Auth)
// @route   GET /api/components/export
export const exportData = async (req: Request, res: Response) => {
  try {
    const allData = await Tracking.find({}).lean(); // .lean() lo hace más rápido devolviendo objetos planos JS

    if (allData.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay datos para exportar' });
    }

    // Configurar campos del CSV
    const fields = [
      '_id',
      'component',
      'variant',
      'action',
      'createdAt',
    ];
    const opts = { fields };

    // Convertir JSON a CSV
    const parser = new Parser(opts);
    const csv = parser.parse(allData);

    // Enviar archivo al navegador/cliente
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics_export.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error al exportar CSV', error });
  }
};
