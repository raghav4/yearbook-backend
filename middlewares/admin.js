module.exports = (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) return res.status(403).send('Access Denied');
  return next();
};
