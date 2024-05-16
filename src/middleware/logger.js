const logger = (req, res, next) => {
  console.log(`${req.method}\t${req.path}`);
  next();
};

module.exports = logger;
