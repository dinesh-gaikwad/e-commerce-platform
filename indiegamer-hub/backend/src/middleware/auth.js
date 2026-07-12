import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { apiResponse } from '../utils/apiResponse.js';

export function protect(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return apiResponse.error(res, 'Not authorized, token missing', 401);

  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    return apiResponse.error(res, 'Not authorized, token invalid', 401);
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      return apiResponse.error(res, 'Forbidden', 403);
    }
    next();
  };
}
