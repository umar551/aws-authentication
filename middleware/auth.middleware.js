 'use strict';
 const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try { 
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.body.user = decoded;
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
  return next();
};

module.exports = verifyToken;