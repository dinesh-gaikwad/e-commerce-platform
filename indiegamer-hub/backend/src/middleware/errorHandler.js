import { apiResponse } from '../utils/apiResponse.js';

export function notFound(req, res) {
  return apiResponse.error(res, `Not Found - ${req.originalUrl}`, 404);
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return apiResponse.error(
    res,
    err.message || 'Internal Server Error',
    statusCode,
    process.env.NODE_ENV === 'production' ? null : err.stack
  );
}
