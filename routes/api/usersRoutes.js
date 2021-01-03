const express = require("express");
const router = express.Router();
const passport = require("passport");

// load user model
const UsersController = require("../../controllers/UsersController.ts");

// @ROUTE POST api/users/register
// @DESC Register user
// @ACCESS Public

router.post("/register", UsersController.register);

// @ROUTE   POST /api/users/me
// @DESC    Return logged user info
// @ACCESS  Private

router.get(
  "/me",
  passport.authenticate("jwt", {
    session: false,
  }),
  UsersController.me
);

module.exports = router;
