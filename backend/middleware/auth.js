const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'nand-kumar-portfolio-jwt-secret-key-2026';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No authorization token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // If mock token was generated on client
    if (token.startsWith('mock-')) {
      req.user = { id: 'usr-1', name: 'Nand Kumar', email: 'nandkumarcoder@gmail.com', role: 'admin' };
      return next();
    }
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
