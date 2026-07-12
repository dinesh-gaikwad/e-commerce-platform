import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { listFeaturedGames } from '../controllers/adminController.js';

const router = Router();
router.get('/featured', protect, authorize('admin'), listFeaturedGames);
export default router;
