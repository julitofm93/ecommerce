import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.sessionCookie;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (error, user) => {
      if (error) res.status(403).json("Token not valid");
      req.user = user;
      next()
    });
  } else {
    return res.status(401).json("Not authenticated");
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed");
    }
  });
};