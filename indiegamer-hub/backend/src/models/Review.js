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
