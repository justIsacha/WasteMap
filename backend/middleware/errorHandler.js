export function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const errorResponse = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };

  if (err.name === 'CastError') {
    errorResponse.message = 'Resource not found, invalid ID';
    res.status(404);
  }

  if (err.name === 'ValidationError') {
    errorResponse.message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    res.status(400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    errorResponse.message = `Duplicate value for ${field}`;
    res.status(400);
  }

  if (err.name === 'JsonWebTokenError') {
    errorResponse.message = 'Invalid token, auth denied';
    res.status(401);
  }

  if (err.name === 'TokenExpiredError') {
    errorResponse.message = 'Token expired, login again';
    res.status(401);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }

  res.json(errorResponse);
}