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
