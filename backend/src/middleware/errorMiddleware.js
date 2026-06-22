// Catches requests to routes that don't exist and responds with clean JSON
// instead of Express's default HTML 404 page.
export const notFound = (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
};

// Final safety-net error handler. Express 5 automatically forwards rejected
// promises from async route handlers here, so any error that wasn't already
// caught and mapped to a specific status code by a controller still gets a
// clean JSON response instead of crashing the request.
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal server error",
  });
};
