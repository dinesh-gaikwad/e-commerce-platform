import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createPost, deletePost, listPostsByThread } from '../controllers/postController.js';

const router = Router();
router.get('/thread/:threadId', listPostsByThread);
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);
export default router;
