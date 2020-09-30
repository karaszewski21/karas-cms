function localPath(req, res, next) {
  res.locals.path = req.path;
  next();
}

module.exports = {
  localPath,
};
