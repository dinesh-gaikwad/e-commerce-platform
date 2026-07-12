import mongoose from 'mongoose';
import slugify from 'slugify';

const gameSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

gameSchema.pre('save', function (next) {
  if (!this.slug && this.title) this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

gameSchema.index({ title: 'text', description: 'text', genre: 'text', tags: 'text' });

export default mongoose.model('Game', gameSchema);
