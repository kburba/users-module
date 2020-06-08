const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const tokenList = {};

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../modules/User");

// route get api/posts/test
// Tests posts route
// public
router.get("/test", (req, res) =>
  res.json({
    msg: "Testing users routes",
  })
);

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
        const avatar = gravatar.url(req.body.email, {
          s: "200", // size
          r: "pg", // rating
          d: "mm", // default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
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
          avatar: user.avatar,
        }; // create JWT payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 5, // 15 min
          },
          (err, token) => {
            const refreshToken = jwt.sign(payload, keys.refreshTokenSecret, {
              expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
            tokenList[refreshToken] = { user: user.email, refreshToken };
            res.json({
              success: true,
              token: "Bearer " + token,
              refreshToken,
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
  const postData = req.body;
  if (postData.refreshToken && postData.refreshToken in tokenList) {
    const user = postData.user;
    console.log("user", user);
    const payload = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
    };

    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      {
        expiresIn: 60 * 15, // 15 min
      },
      (err, token) => {
        res.json({
          token: "Bearer " + token,
        });
      }
    );
  } else {
    res.status(404).json({ error: "Unauthorised request" });
  }
});

// @route POST api/users/me
// @desc Return me user
// @access Private

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
