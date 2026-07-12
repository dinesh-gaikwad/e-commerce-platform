export const apiResponse = {
  success: (res, data = null, message = 'Success', statusCode = 200) =>
    res.status(statusCode).json({ success: true, message, data }),
  error: (res, message = 'Error', statusCode = 500, details = null) =>
    res.status(statusCode).json({ success: false, message, details })
};
