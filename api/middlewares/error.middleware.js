const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const error = err.message || "Server Error";

  res.status(status).json({ error });
};

export default errorMiddleware;