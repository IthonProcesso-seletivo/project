import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRoutes = Router();

userRoutes.get('/', UserController.getAll);
userRoutes.get('/:id', UserController.getById);
userRoutes.post('/', UserController.create);
