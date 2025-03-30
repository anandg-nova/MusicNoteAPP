import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
  userId: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export const jwtService = {
  generateToken: (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
    const options: SignOptions = {
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    };
    return jwt.sign(payload, JWT_SECRET, options);
  },

  verifyToken: (token: string): JwtPayload => {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  decodeToken: (token: string): JwtPayload | null => {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}; 