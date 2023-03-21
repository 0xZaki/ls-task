const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const userController = require('../controllers/userController.js');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.js');

router.post('/register', userController.register);

router.post('/login', userController.login);


module.exports = router;