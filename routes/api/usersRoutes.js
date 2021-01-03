const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../../validation/register");

// load user model
const User = require("../../modules/User");

// @ROUTE POST api/users/register
// @DESC Register user
// @ACCESS Public

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

// @ROUTE   POST /api/users/me
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
