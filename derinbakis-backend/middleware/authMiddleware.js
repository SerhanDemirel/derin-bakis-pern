const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ message: 'Token gerekli' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, email vs.
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
}

module.exports = verifyToken;
