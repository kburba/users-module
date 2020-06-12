const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const refreshTokens = [];

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../modules/User");

// route get api/posts/test
// Tests posts route
// public
router.get("/test", (req, res) => {
  console.log("req", req.user);
  res.json(req.user);
});

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        errors.email = "email already exists";
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              return err;
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json(user);
              })
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

// @route POST api/users/login
// @desc User log in and generate JWT token
// @access Public

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

// @ROUTE POST /api/users/token
// @DESC Renew access token
// @ACCESS Private

router.post("/token", (req, res) => {
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

// @ROUTE   POST api/users/me
// @DESC    Return logged user info
// @ACCESS  Private

router.get(
  "/me",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
