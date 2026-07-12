import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createReview, deleteReview, listReviewsByGame, updateReview } from '../controllers/reviewController.js';

const router = Router();
router.get('/game/:gameId', listReviewsByGame);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
export default router;
