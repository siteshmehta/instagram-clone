import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const publicPaths = process.env.PUBLIC_PATH;
  if (publicPaths.includes(req.path)) {
    return next();
  }

  const token = `${req.headers.authorization}`.split(" ")[1]; //Bearer TOKEN_VALUE
  const SECRET_KEY = process.env.JWT_TOKEN;
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.currentUserInfo = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: 'Invalid token' });
  }
}
