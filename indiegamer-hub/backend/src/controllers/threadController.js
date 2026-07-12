import Thread from '../models/Thread.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createThread(req, res) {
  const thread = await Thread.create({ ...req.body, user: req.user.id });
  return apiResponse.success(res, thread, 'Thread created', 201);
}

export async function listThreadsByGame(req, res) {
  const threads = await Thread.find({ game: req.params.gameId })
    .populate('user', 'name avatar role')
    .sort({ isPinned: -1, createdAt: -1 });
  return apiResponse.success(res, threads, 'Game threads');
}

export async function updateThread(req, res) {
  const thread = await Thread.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!thread) return apiResponse.error(res, 'Thread not found', 404);
  return apiResponse.success(res, thread, 'Thread updated');
}

export async function deleteThread(req, res) {
  const thread = await Thread.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!thread) return apiResponse.error(res, 'Thread not found', 404);
  return apiResponse.success(res, null, 'Thread deleted');
}
