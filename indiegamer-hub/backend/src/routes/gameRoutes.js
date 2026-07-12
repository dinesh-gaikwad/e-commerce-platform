import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  createGame,
  createGameFromSteam,
  deleteGame,
  getGameBySlug,
  listGames,
  toggleFeatured,
  updateGame
} from '../controllers/gameController.js';

const router = Router();
router.get('/', listGames);
router.get('/:slug', getGameBySlug);
router.post('/', protect, authorize('dev', 'admin'), createGame);
router.post('/steam', protect, authorize('dev', 'admin'), createGameFromSteam);
router.put('/:id', protect, authorize('dev', 'admin'), updateGame);
router.delete('/:id', protect, authorize('admin'), deleteGame);
router.patch('/:id/featured', protect, authorize('admin'), toggleFeatured);
export default router;
