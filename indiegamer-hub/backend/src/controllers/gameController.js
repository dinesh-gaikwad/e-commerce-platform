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
