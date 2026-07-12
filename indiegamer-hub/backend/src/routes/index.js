import { Router } from 'express';
import authRoutes from './authRoutes.js';
import gameRoutes from './gameRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import threadRoutes from './threadRoutes.js';
import postRoutes from './postRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/games', gameRoutes);
router.use('/reviews', reviewRoutes);
router.use('/threads', threadRoutes);
router.use('/posts', postRoutes);
router.use('/admin', adminRoutes);
router.get('/', (req, res) => res.json({ message: 'IndieGamer Hub API ready' }));
export default router;
