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
