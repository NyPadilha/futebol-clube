import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';

export default class tokenValidation {
  static validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];
    const email = verifyToken(token);

    if (!email || !authorization.startsWith('Bearer') || !token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
