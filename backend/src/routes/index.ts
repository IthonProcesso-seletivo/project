import { Router } from 'express';
import { userRoutes } from './user.routes';

export const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/users', userRoutes);
