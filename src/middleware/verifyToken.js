const jwt = require("jsonwebtoken");
const config = require("../config/config");
const test = "51cy1vu1v18312";
module.exports = {
  verifyToken: (req, res, next) => {
    const { accessTokenSecret: accessSecret } = config.jwt;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);
    jwt.verify(token, accessSecret, (err, decode) => {
      if (err) return res.status(403).json({ msg: "Please login first" });
      req.user = decode; // Store the decoded user information
      next();
    });
  },
};
