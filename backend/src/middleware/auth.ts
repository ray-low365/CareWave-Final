import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Extended Request interface to include user property
interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

/**
 * Authentication middleware to verify JWT token
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: true, message: 'Authorization header missing' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: true, message: 'Token missing' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      role: string;
    };
    
    // Add user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: true, message: 'Invalid token' });
  }
};

/**
 * Role-based authorization middleware
 */
export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: true, message: 'Forbidden: Insufficient permissions' });
    }
    
    next();
  };
};
