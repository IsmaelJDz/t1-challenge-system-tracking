import { type Request, type Response } from 'express';
import { Tracking } from '../models/tracking.js';
import { Parser } from 'json2csv';
import { io } from '../index.js';

export const trackInteraction = async (
  req: Request,
  res: Response
) => {
  try {
    const { component, variant, action, metadata } = req.body;

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

    const stats = await Tracking.aggregate([
      {
        $group: {
          _id: '$component',
          count: { $sum: 1 },
          actions: { $push: '$action' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    io.emit('stats-updated', stats);

    res.status(201).json(newTrack);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al guardar tracking', error });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await Tracking.aggregate([
      {
        $group: {
          _id: '$component',
          count: { $sum: 1 },
          actions: { $push: '$action' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener estadísticas', error });
  }
};

export const exportData = async (req: Request, res: Response) => {
  try {
    const allData = await Tracking.find({}).lean();

    if (allData.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hay datos para exportar' });
    }

    const fields = [
      '_id',
      'component',
      'variant',
      'action',
      'createdAt',
    ];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(allData);

    res.header('Content-Type', 'text/csv');
    res.attachment('analytics_export.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error al exportar CSV', error });
  }
};
