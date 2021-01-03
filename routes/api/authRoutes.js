const express = require("express");
const router = express.Router();

const AuthController = require("../../controllers/AuthController.ts");

// @ROUTE POST /api/users/token
// @DESC Renew access token
// @ACCESS Private

router.post("/refresh-token", AuthController.refresh_token);

// @ROUTE POST /api/auth/login
// @DESC User log in and generate JWT token
// @ACCESS Public

router.post("/login", AuthController.login);

module.exports = router;
