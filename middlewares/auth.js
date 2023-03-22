// write auth middleware here
const jwt = require('jsonwebtoken')
const User = require('../models/User.js');

const authMiddleware = (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid token' });
    }
  };
  
  module.exports = authMiddleware;