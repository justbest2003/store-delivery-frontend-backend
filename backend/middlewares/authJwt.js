const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

//Verify Token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; //jwt.sign
    next();
  });
};

//isAdmin?
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

//isMod?
isMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Moderator Role!" });
      return;
    });
  });
};

///isAdminOrMod
isAdminOrMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Admin or Moderator Role!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isAdminOrMod,
};
module.exports = authJwt;
