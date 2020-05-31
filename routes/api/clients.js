const express = require("express");

const router = express.Router();
const passport = require("passport");

const ClientsController = require("../../controllers/ClientsController.ts");

// @ROUTE   DELETE api/clients/:client_id,
// @DESC    Delete existing client
// @ACCESS  Private
router.delete(
  "/:client_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientsController.deleteById
);

// @ROUTE   PUT api/clients/:client_id,
// @DESC    Update existing client
// @ACCESS  Private
router.put(
  "/:client_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientsController.updateById
);

// @ROUTE GET api/clients/:id
// @DESC get client info by id
// @ACCESS Private
router.get(
  "/:client_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientsController.getById
);

// @ROUTE GET api/clients
// @DESC get all clients
// @ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientsController.getAll
);

// @route POST api/clients
// @desc add new clients
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  ClientsController.addNew
);
module.exports = router;
