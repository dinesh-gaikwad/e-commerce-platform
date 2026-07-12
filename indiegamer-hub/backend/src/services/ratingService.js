import Review from '../models/Review.js';
import Game from '../models/Game.js';

export async function recalculateGameRating(gameId) {
  const result = await Review.aggregate([
    { $match: { game: gameId } },
    {
      $group: {
        _id: '$game',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  const payload = result[0] || { averageRating: 0, reviewCount: 0 };

  await Game.findByIdAndUpdate(gameId, {
    averageRating: Number((payload.averageRating || 0).toFixed(2)),
    reviewCount: payload.reviewCount || 0
  });

  return payload;
}
