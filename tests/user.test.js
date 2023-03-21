const userController = require('../controllers/userController');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

describe('User Controller', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/');
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          email: 'testuser@test.com',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await userController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ msg: 'User created' });

      const createdUser = await User.findOne({ email: 'testuser@test.com' });
      expect(createdUser).toBeDefined();
      expect(createdUser.email).toBe('testuser@test.com');
      expect(await bcrypt.compare('password123', createdUser.passwordHash)).toBe(true);
    });

    it('should return an error if password is not provided or too short', async () => {
      const req = {
        body: {
          email: 'testuser@test.com',
          password: '',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await userController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Please enter all fields.' });

      const createdUser = await User.findOne({ email: 'testuser2@test.com' });
      expect(createdUser).toBeNull();

      // Test with short password
      req.body.password = 'short';
      await userController.register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'The password needs to be at least 8 characters long.' });

      const createdUser2 = await User.findOne({ email: 'testuser2@test.com' });
      expect(createdUser2).toBeNull();
    });
  });
});