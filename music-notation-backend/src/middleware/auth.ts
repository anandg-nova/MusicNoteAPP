import { Request, Response, NextFunction } from 'express';
import { jwtService, JwtPayload } from '../services/jwtService';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      _res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    const decoded = jwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    _res.status(401).json({ message: 'Token is not valid' });
  }
};

export const admin = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.isAdmin) {
      _res.status(403).json({ message: 'Access denied. Admin only.' });
      return;
    }
    next();
  } catch (err) {
    _res.status(500).json({ message: 'Server Error' });
  }
}; 