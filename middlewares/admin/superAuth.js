module.exports = (req, res, next) => {
  if (!req.admin.isSuperAdmin) {
    return res.status(403).send('Access Denied');
  }
  return next();
};
