import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export const AuthController = {
  /**
   * Login a user
   */
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: true, message: 'Email and password are required' });
      }
      
      const authResponse = await AuthService.login(email, password);
      
      res.status(200).json(authResponse);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({ error: true, message: error.message });
      } else {
        res.status(500).json({ error: true, message: error.message });
      }
    }
  },
  
  /**
   * Verify a token
   */
  verifyToken: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ error: true, message: 'Authorization header missing' });
      }
      
      const token = authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: true, message: 'Token missing' });
      }
      
      const user = await AuthService.verifyToken(token);
      
      res.status(200).json({ valid: true, user });
    } catch (error: any) {
      res.status(401).json({ valid: false, message: error.message });
    }
  }
};
