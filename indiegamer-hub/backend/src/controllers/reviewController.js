import Review from '../models/Review.js';
import { recalculateGameRating } from '../services/ratingService.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createReview(req, res) {
  const review = await Review.create({ ...req.body, user: req.user.id });
  await recalculateGameRating(review.game);
  return apiResponse.success(res, review, 'Review created', 201);
}

export async function listReviewsByGame(req, res) {
  const reviews = await Review.find({ game: req.params.gameId })
    .populate('user', 'name avatar role')
    .sort({ createdAt: -1 });
  return apiResponse.success(res, reviews, 'Game reviews');
}

export async function updateReview(req, res) {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
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
