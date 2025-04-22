import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, AuthResponse } from '../models/types';

// Load environment variables
dotenv.config();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Mock users for development (in production, this would use the database)
const mockUsers = [
  {
    id: 1,
    email: 'admin@carewave.com',
    password: 'password', // In production, this would be hashed
    name: 'Admin User',
    role: 'Administrator'
  },
  {
    id: 2,
    email: 'doctor@carewave.com',
    password: 'password', // In production, this would be hashed
    name: 'Doctor User',
    role: 'Doctor'
  }
];

export const AuthService = {
  /**
   * Login a user
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Check password (in production, this would use bcrypt.compare)
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    // Create user object without password
    const userWithoutPassword: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
    
    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      user: userWithoutPassword,
      token
    };
  },
  
  /**
   * Verify a token
   */
  verifyToken: async (token: string): Promise<User> => {
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: number;
        email: string;
        role: string;
      };
      
      // Find user by ID
      const user = mockUsers.find(u => u.id === decoded.id);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Return user without password
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};
