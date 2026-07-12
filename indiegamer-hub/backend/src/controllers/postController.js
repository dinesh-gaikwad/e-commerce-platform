import Post from '../models/Post.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function createPost(req, res) {
  const post = await Post.create({ ...req.body, user: req.user.id });
  return apiResponse.success(res, post, 'Post created', 201);
}

export async function listPostsByThread(req, res) {
  const posts = await Post.find({ thread: req.params.threadId })
    .populate('user', 'name avatar role')
    .sort({ createdAt: 1 });
  return apiResponse.success(res, posts, 'Thread posts');
}

export async function deletePost(req, res) {
  const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!post) return apiResponse.error(res, 'Post not found', 404);
  return apiResponse.success(res, null, 'Post deleted');
}
