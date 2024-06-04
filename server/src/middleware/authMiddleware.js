const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(req.cookies.accessToken);
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};


module.exports = authMiddleware;