import Game from '../models/Game.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function listFeaturedGames(req, res) {
  const games = await Game.find({ isFeatured: true }).sort({ createdAt: -1 });
  return apiResponse.success(res, games, 'Featured games');
}
