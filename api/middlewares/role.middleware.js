const validateRole = (roles) => (req, res, next) => {
  const { user } = req;
  if (!roles.includes(user.role)) return res.sendStatus(403);
  next();
};

export default validateRole;