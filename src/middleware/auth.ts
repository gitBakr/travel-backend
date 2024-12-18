import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    const decodedToken = jwt.verify(token, 'votre_secret_jwt') as { userId: string };
    (req as any).userId = decodedToken.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};