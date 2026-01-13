import {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

// Extendemos la interfaz de Express para incluir "user"
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener el token del header (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded: any = jwt.verify(
        token!,
        process.env.JWT_SECRET || 'secret'
      );

      // Buscar el usuario y adjuntarlo a la request (sin password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Todo bien, pase adelante
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};
