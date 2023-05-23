import jwt from 'jsonwebtoken';

export function generateToken(payload) {
    
  const SECRET_KEY = process.env.JWT_TOKEN;

  const token = jwt.sign( payload , SECRET_KEY, { expiresIn: '1d' });

  return token;
}