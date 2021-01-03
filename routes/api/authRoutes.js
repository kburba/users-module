const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const refreshTokens = [];

// load input validation
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../modules/User");

// @ROUTE POST /api/users/token
// @DESC Renew access token
// @ACCESS Private

router.post("/refresh-token", (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) return res.sendStatus(401);
  if (!refreshTokens.includes(refresh_token)) return res.sendStatus(403);
  jwt.verify(refresh_token, keys.refreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    }; // create JWT payload

    // Sign token
    const expireIn = 60 * 15; // 15 min
    jwt.sign(
      payload,
      keys.accessTokenKey,
      {
        expiresIn: expireIn,
      },
      (err, token) => {
        if (err) return res.sendStatus(403);
        res.json({
          access_token: token,
        });
      }
    );
  });
});

// @ROUTE POST /api/auth/login
// @DESC User log in and generate JWT token
// @ACCESS Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({
    email,
  }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User pass matched
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        }; // create JWT payload

        // Sign token
        const expireIn = 60 * 15; // 15 min
        jwt.sign(
          payload,
          keys.accessTokenKey,
          {
            expiresIn: expireIn,
          },
          (err, token) => {
            const refresh_token = jwt.sign(payload, keys.refreshTokenSecret, {
              expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            refreshTokens.push(refresh_token);
            res.json({
              access_token: token,
              token_type: "bearer",
              expires_in: expireIn,
              refresh_token: refresh_token,
              scope: "create",
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
