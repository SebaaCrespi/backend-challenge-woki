import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { UserService } from '../../../domain/services/UserService';
import { UserRepository } from '../../../infrastructure/persistence/repositories/UserRepository';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const validateCreateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await userService.getUserByEmail(req.body.email);
      if (!user) {
        return res.status(404).json({ message: 'Email already exists' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating user id', error });
    }
  },
];

export const validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Error validating user id', error });
    }
  },
];
