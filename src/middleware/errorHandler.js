const errorHandler = (err, req, res, next) => {
  console.log(`${err.name}\t${err.stack}`);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ error: err.message });
  next();
};

module.exports = errorHandler;
