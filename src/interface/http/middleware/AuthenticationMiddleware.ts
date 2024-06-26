import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'a9ca47a80ecfa2ab558296eeecd9ec22126075fedd446938075b785994500d7e'

interface JWTPayload {
  userId: string;
}

declare global {
namespace Express {
    interface Request {
    user?: JWTPayload;
    }
}
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token ' });
    }
    
    req.user = decoded as JWTPayload;
    next();
  });
};