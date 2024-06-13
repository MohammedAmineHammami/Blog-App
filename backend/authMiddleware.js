import express from "express";
import jwt from "jsonwebtoken";

const authVerification = (req, res, next) => {
  const token = req.cookie["access-token"];
  if (!token) return res.status(400).json("your are not authenticated!");
  jwt.verify(token, "jwtKey", (err, decoded) => {
    if (err) {
      res.status(301).json(err.message);
    }
    req.userPayload = decoded;
    next();
  });
};
