import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js'; // Importante la extensión .js

// Generar Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
export const registerUser = async (req: Request, res: Response) => {
  console.log('🔵 registerUser llamado');
  console.log('Body recibido:', req.body);
  try {
    const { email, password } = req.body;

    // Verificar si ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'El usuario ya existe' });
    }

    // Crear usuario (el hook pre-save encriptará la contraseña)
    const user = await User.create({ email, password });

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });

    // Verificar password usando el método que creamos en el modelo
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
