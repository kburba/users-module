const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// load input validation
const validateRegisterInput = require("../validation/register");

// load user model
const User = require("../modules/User");

exports.me = function (req, res) {
  res.json(req.user);
};

exports.register = function (req, res) {
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
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return err;
            }
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });

            newUser.save((err, data) => {
              if (err) {
                return console.log(err);
              }
              const {
                _doc: { password, ...user },
              } = data;
              res.json(user);
            });
          });
        });
      }
    })
    .catch((err) => console.log(err));
};
