#!/usr/bin/env bash
set -euo pipefail

ROOT="indiegamer-hub"
mkdir -p "$ROOT"
cd "$ROOT"

mkdir -p .devcontainer backend/src/{config,controllers,middleware,models,routes,services,utils} frontend/src/{assets,components,pages,routes,styles} docs slides deployment scripts assets data

cat > .gitignore <<'EOF'
node_modules
.env
.env.*
dist
build
coverage
.DS_Store
.vscode
EOF

cat > .env.example <<'EOF'
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/indiegamerhub
JWT_SECRET=change_this_secret
CLIENT_URL=http://localhost:5173
STEAM_COUNTRY=us
STEAM_LANG=en
EOF

cat > README.md <<'EOF'
# IndieGamer Hub

MERN internship project scaffold.

## Run
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `cd frontend && npm install && npm run dev`
EOF

cat > deployment/deployment-notes.md <<'EOF'
# Deployment Notes

## Run Steps
1. Create `.env` from `.env.example`.
2. Install backend dependencies.
3. Install frontend dependencies.
4. Start backend and frontend.
5. Deploy backend on Render and frontend on Vercel/Netlify.
EOF

cat > docs/system-design.md <<'EOF'
# System Design

User -> Game -> Review -> Thread -> Post
EOF

cat > docs/project-outline.md <<'EOF'
# Project Outline

- Authentication
- Game Management
- Steam API Integration
- Reviews
- Forum Threads
- Posts
- Featured Games
- Admin Panel
EOF

cat > slides/ppt-outline.md <<'EOF'
# 20 Slide PPT Outline

1. Title
2. Problem Statement
3. Solution
4. Tech Stack
5. Architecture
6. Folder Structure
7. User Roles
8. Auth Flow
9. Game Model
10. Steam API
11. Review System
12. Average Rating
13. Forums
14. Featured Games
15. Trending
16. UI Plan
17. Deployment
18. Testing
19. Challenges
20. Conclusion
EOF

cat > .devcontainer/devcontainer.json <<'EOF'
{
  "name": "indiegamer-hub",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm",
  "postCreateCommand": "npm --prefix backend install && npm --prefix frontend install",
  "forwardPorts": [5173, 5000],
  "customizations": {
    "codespaces": {
      "openFiles": [
        "README.md",
        "deployment/deployment-notes.md",
        "docs/system-design.md",
        "backend/src/server.js"
      ]
    }
  }
}
EOF

cat > backend/package.json <<'EOF'
{
  "name": "indiegamer-hub-backend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.2",
    "morgan": "^1.10.0",
    "slugify": "^1.6.6"
  }
}
EOF

cat > backend/src/config/env.js <<'EOF'
import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'change_this_secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  STEAM_COUNTRY: process.env.STEAM_COUNTRY || 'us',
  STEAM_LANG: process.env.STEAM_LANG || 'en'
};
EOF

cat > backend/src/config/db.js <<'EOF'
import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGO_URI is required');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
}
EOF

cat > backend/src/utils/apiResponse.js <<'EOF'
export const apiResponse = {
  success: (res, data = null, message = 'Success', statusCode = 200) =>
    res.status(statusCode).json({ success: true, message, data }),
  error: (res, message = 'Error', statusCode = 500, details = null) =>
    res.status(statusCode).json({ success: false, message, details })
};
EOF

cat > backend/src/utils/asyncHandler.js <<'EOF'
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
EOF

cat > backend/src/middleware/errorHandler.js <<'EOF'
import { apiResponse } from '../utils/apiResponse.js';

export function notFound(req, res) {
  return apiResponse.error(res, `Not Found - ${req.originalUrl}`, 404);
}

export function errorHandler(err, req, res, next) {
  const code = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return apiResponse.error(res, err.message || 'Internal Server Error', code, process.env.NODE_ENV === 'production' ? null : err.stack);
}
EOF

cat > backend/src/middleware/auth.js <<'EOF'
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { apiResponse } from '../utils/apiResponse.js';

export function protect(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return apiResponse.error(res, 'Not authorized, token missing', 401);

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    return apiResponse.error(res, 'Not authorized, token invalid', 401);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) return apiResponse.error(res, 'Forbidden', 403);
    next();
  };
}
EOF

cat > backend/src/models/User.js <<'EOF'
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['gamer', 'dev', 'admin'], default: 'gamer' },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
EOF

cat > backend/src/models/Game.js <<'EOF'
import mongoose from 'mongoose';
import slugify from 'slugify';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true, trim: true },
  description: { type: String, default: '' },
  genre: [{ type: String, trim: true }],
  releaseDate: { type: Date },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  screenshots: [{ type: String }],
  trailerUrl: { type: String, default: '' },
  storeLinks: {
    steam: { type: String, default: '' },
    epic: { type: String, default: '' },
    itch: { type: String, default: '' }
  },
  steamAppId: { type: String, default: '' },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  tags: [{ type: String }],
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

gameSchema.pre('save', function (next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

gameSchema.index({ title: 'text', description: 'text', genre: 'text', tags: 'text' });

export default mongoose.model('Game', gameSchema);
EOF

cat > backend/src/models/Review.js <<'EOF'
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, default: '' },
  body: { type: String, default: '' }
}, { timestamps: true });

reviewSchema.index({ game: 1, user: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
EOF

cat > backend/src/models/Thread.js <<'EOF'
import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Thread', threadSchema);
EOF

cat > backend/src/models/Post.js <<'EOF'
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
EOF

cat > backend/src/services/steamApi.js <<'EOF'
import axios from 'axios';
import { env } from '../config/env.js';

const client = axios.create({ baseURL: 'https://store.steampowered.com/api', timeout: 15000 });

export async function fetchSteamAppDetails(appId) {
  const { data } = await client.get('/appdetails', { params: { appids: appId, cc: env.STEAM_COUNTRY, l: env.STEAM_LANG } });
  const payload = data?.[String(appId)];
  if (!payload?.success) throw new Error('Steam appdetails fetch failed');

  const d = payload.data || {};
  const price = d.price_overview || {};
  const release = d.release_date || {};

  return {
    steamAppId: String(appId),
    title: d.name || '',
    description: d.short_description || '',
    releaseDate: release.date ? new Date(release.date) : null,
    genres: (d.genres || []).map((g) => g.description).filter(Boolean),
    tags: (d.categories || []).map((c) => c.description).filter(Boolean),
    screenshots: (d.screenshots || []).map((s) => s.path_full || s.path_thumbnail).filter(Boolean),
    trailerUrl: d.movies?.[0]?.mp4?.max || '',
    price: typeof price.final === 'number' ? Number((price.final / 100).toFixed(2)) : 0,
    currency: price.currency || 'USD'
  };
}
EOF

cat > backend/src/services/ratingService.js <<'EOF'
import Review from '../models/Review.js';
import Game from '../models/Game.js';

export async function recalculateGameRating(gameId) {
  const result = await Review.aggregate([
    { $match: { game: gameId } },
    { $group: { _id: '$game', averageRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
  ]);
  const payload = result[0] || { averageRating: 0, reviewCount: 0 };
  await Game.findByIdAndUpdate(gameId, {
    averageRating: Number((payload.averageRating || 0).toFixed(2)),
    reviewCount: payload.reviewCount || 0
  });
  return payload;
}
EOF

cat > backend/src/controllers/authController.js <<'EOF'
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';
import { apiResponse } from '../utils/apiResponse.js';

const signToken = (user) => jwt.sign({ id: user._id.toString(), role: user.role, email: user.email, name: user.name }, env.JWT_SECRET, { expiresIn: '7d' });

export async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email })) return apiResponse.error(res, 'Email already exists', 409);
  const user = await User.create({ name, email, password, role });
  return apiResponse.success(res, { user, token: signToken(user) }, 'Registered', 201);
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return apiResponse.error(res, 'Invalid credentials', 401);
  if (!(await user.matchPassword(password))) return apiResponse.error(res, 'Invalid credentials', 401);
  user.password = undefined;
  return apiResponse.success(res, { user, token: signToken(user) }, 'Logged in');
}

export async function me(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return apiResponse.error(res, 'User not found', 404);
  return apiResponse.success(res, user, 'Profile');
}
EOF

cat > backend/src/controllers/gameController.js <<'EOF'
import Game from '../models/Game.js';
import { fetchSteamAppDetails } from '../services/steamApi.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createGame(req, res) {
  const game = await Game.create({ ...req.body, developer: req.user.id });
  return apiResponse.success(res, game, 'Game created', 201);
}

export async function createGameFromSteam(req, res) {
  const { appId, storeLinks = {} } = req.body;
  const steam = await fetchSteamAppDetails(appId);
  const game = await Game.create({
    title: steam.title,
    description: steam.description,
    releaseDate: steam.releaseDate,
    genre: steam.genres,
    screenshots: steam.screenshots,
    trailerUrl: steam.trailerUrl,
    steamAppId: steam.steamAppId,
    price: steam.price,
    currency: steam.currency,
    tags: steam.tags,
    storeLinks: {
      steam: storeLinks.steam || `https://store.steampowered.com/app/${appId}`,
      epic: storeLinks.epic || '',
      itch: storeLinks.itch || ''
    },
    developer: req.user.id
  });
  return apiResponse.success(res, game, 'Game created from Steam', 201);
}

export async function listGames(req, res) {
  const { q, featured, trending } = req.query;
  const filter = { isPublished: true };
  if (featured === 'true') filter.isFeatured = true;
  if (trending === 'true') filter.isTrending = true;
  if (q) filter.$text = { $search: q };
  const games = await Game.find(filter).sort({ isFeatured: -1, averageRating: -1, createdAt: -1 });
  return apiResponse.success(res, games, 'Games list');
}

export async function getGameBySlug(req, res) {
  const game = await Game.findOne({ slug: req.params.slug });
  if (!game) return apiResponse.error(res, 'Game not found', 404);
  return apiResponse.success(res, game, 'Game details');
}

export async function updateGame(req, res) {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!game) return apiResponse.error(res, 'Game not found', 404);
  return apiResponse.success(res, game, 'Game updated');
}

export async function deleteGame(req, res) {
  const game = await Game.findByIdAndDelete(req.params.id);
  if (!game) return apiResponse.error(res, 'Game not found', 404);
  return apiResponse.success(res, null, 'Game deleted');
}

export async function toggleFeatured(req, res) {
  const game = await Game.findById(req.params.id);
  if (!game) return apiResponse.error(res, 'Game not found', 404);
  game.isFeatured = !game.isFeatured;
  await game.save();
  return apiResponse.success(res, game, 'Featured toggled');
}
EOF

cat > backend/src/controllers/reviewController.js <<'EOF'
import Review from '../models/Review.js';
import { recalculateGameRating } from '../services/ratingService.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createReview(req, res) {
  const review = await Review.create({ ...req.body, user: req.user.id });
  await recalculateGameRating(review.game);
  return apiResponse.success(res, review, 'Review created', 201);
}

export async function listReviewsByGame(req, res) {
  const reviews = await Review.find({ game: req.params.gameId }).populate('user', 'name avatar role').sort({ createdAt: -1 });
  return apiResponse.success(res, reviews, 'Game reviews');
}

export async function updateReview(req, res) {
  const review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  if (!review) return apiResponse.error(res, 'Review not found', 404);
  await recalculateGameRating(review.game);
  return apiResponse.success(res, review, 'Review updated');
}

export async function deleteReview(req, res) {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!review) return apiResponse.error(res, 'Review not found', 404);
  await recalculateGameRating(review.game);
  return apiResponse.success(res, null, 'Review deleted');
}
EOF

cat > backend/src/controllers/threadController.js <<'EOF'
import Thread from '../models/Thread.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createThread(req, res) {
  const thread = await Thread.create({ ...req.body, user: req.user.id });
  return apiResponse.success(res, thread, 'Thread created', 201);
}

export async function listThreadsByGame(req, res) {
  const threads = await Thread.find({ game: req.params.gameId }).populate('user', 'name avatar role').sort({ isPinned: -1, createdAt: -1 });
  return apiResponse.success(res, threads, 'Game threads');
}

export async function updateThread(req, res) {
  const thread = await Thread.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  if (!thread) return apiResponse.error(res, 'Thread not found', 404);
  return apiResponse.success(res, thread, 'Thread updated');
}

export async function deleteThread(req, res) {
  const thread = await Thread.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!thread) return apiResponse.error(res, 'Thread not found', 404);
  return apiResponse.success(res, null, 'Thread deleted');
}
EOF

cat > backend/src/controllers/postController.js <<'EOF'
import Post from '../models/Post.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createPost(req, res) {
  const post = await Post.create({ ...req.body, user: req.user.id });
  return apiResponse.success(res, post, 'Post created', 201);
}

export async function listPostsByThread(req, res) {
  const posts = await Post.find({ thread: req.params.threadId }).populate('user', 'name avatar role').sort({ createdAt: 1 });
  return apiResponse.success(res, posts, 'Thread posts');
}

export async function deletePost(req, res) {
  const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!post) return apiResponse.error(res, 'Post not found', 404);
  return apiResponse.success(res, null, 'Post deleted');
}
EOF

cat > backend/src/controllers/adminController.js <<'EOF'
import Game from '../models/Game.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function listFeaturedGames(req, res) {
  const games = await Game.find({ isFeatured: true }).sort({ createdAt: -1 });
  return apiResponse.success(res, games, 'Featured games');
}
EOF

cat > backend/src/routes/authRoutes.js <<'EOF'
import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
export default router;
EOF

cat > backend/src/routes/gameRoutes.js <<'EOF'
import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { createGame, createGameFromSteam, deleteGame, getGameBySlug, listGames, toggleFeatured, updateGame } from '../controllers/gameController.js';

const router = Router();
router.get('/', listGames);
router.get('/:slug', getGameBySlug);
router.post('/', protect, authorize('dev', 'admin'), createGame);
router.post('/steam', protect, authorize('dev', 'admin'), createGameFromSteam);
router.put('/:id', protect, authorize('dev', 'admin'), updateGame);
router.delete('/:id', protect, authorize('admin'), deleteGame);
router.patch('/:id/featured', protect, authorize('admin'), toggleFeatured);
export default router;
EOF

cat > backend/src/routes/reviewRoutes.js <<'EOF'
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createReview, deleteReview, listReviewsByGame, updateReview } from '../controllers/reviewController.js';

const router = Router();
router.get('/game/:gameId', listReviewsByGame);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
export default router;
EOF

cat > backend/src/routes/threadRoutes.js <<'EOF'
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createThread, deleteThread, listThreadsByGame, updateThread } from '../controllers/threadController.js';

const router = Router();
router.get('/game/:gameId', listThreadsByGame);
router.post('/', protect, createThread);
router.put('/:id', protect, updateThread);
router.delete('/:id', protect, deleteThread);
export default router;
EOF

cat > backend/src/routes/postRoutes.js <<'EOF'
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createPost, deletePost, listPostsByThread } from '../controllers/postController.js';

const router = Router();
router.get('/thread/:threadId', listPostsByThread);
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);
export default router;
EOF

cat > backend/src/routes/adminRoutes.js <<'EOF'
import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { listFeaturedGames } from '../controllers/adminController.js';

const router = Router();
router.get('/featured', protect, authorize('admin'), listFeaturedGames);
export default router;
EOF

cat > backend/src/routes/index.js <<'EOF'
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
EOF

cat > backend/src/app.js <<'EOF'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
export default app;
EOF

cat > backend/src/server.js <<'EOF'
import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

await connectDB(env.MONGO_URI);
app.listen(env.PORT, () => console.log(`Backend running on port ${env.PORT}`));
EOF

cat > frontend/package.json <<'EOF'
{
  "name": "indiegamer-hub-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.2"
  }
}
EOF

cat > frontend/src/main.jsx <<'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

function App(){ return <div style={{padding:20,background:'#111',color:'#fff',minHeight:'100vh'}}>IndieGamer Hub</div>; }

ReactDOM.createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
EOF

for f in \
  backend/src/controllers/.gitkeep backend/src/models/.gitkeep backend/src/routes/.gitkeep backend/src/services/.gitkeep backend/src/middleware/.gitkeep backend/src/config/.gitkeep \
  frontend/src/components/.gitkeep frontend/src/pages/.gitkeep frontend/src/routes/.gitkeep frontend/src/styles/.gitkeep frontend/src/assets/.gitkeep \
  docs/.gitkeep slides/.gitkeep deployment/.gitkeep scripts/.gitkeep assets/.gitkeep data/.gitkeep
do
  touch "$f"
done

cat > scripts/dev.sh <<'EOF'
#!/usr/bin/env bash
set -e
npm --prefix backend install
npm --prefix frontend install
npm --prefix backend run dev &
npm --prefix frontend run dev
EOF
chmod +x scripts/dev.sh

echo "Done. Full structure created."