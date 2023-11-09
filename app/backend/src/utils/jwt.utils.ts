import { sign, verify } from 'jsonwebtoken';

export const generateToken = (email: string): string =>
  sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });

export const verifyToken = (token: string): string | null => {
  try {
    const { email } = verify(token, process.env.JWT_SECRET || 'secret') as { email: string };
    return email;
  } catch (err) {
    return null;
  }
};
