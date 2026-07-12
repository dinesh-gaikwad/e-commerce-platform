import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createThread, deleteThread, listThreadsByGame, updateThread } from '../controllers/threadController.js';

const router = Router();
router.get('/game/:gameId', listThreadsByGame);
router.post('/', protect, createThread);
router.put('/:id', protect, updateThread);
router.delete('/:id', protect, deleteThread);
export default router;
