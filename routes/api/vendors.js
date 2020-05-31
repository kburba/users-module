const express = require("express");

const router = express.Router();
const passport = require("passport");

const VendorsController = require("../../controllers/VendorsController.ts");

// @ROUTE   DELETE api/vendors/:vendor_id,
// @DESC    Delete existing vendor
// @ACCESS  Private
router.delete(
  "/:vendor_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  VendorsController.deleteById
);

// @ROUTE   PUT api/vendors/:vendor_id,
// @DESC    Update existing vendor
// @ACCESS  Private
router.put(
  "/:vendor_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  VendorsController.updateById
);

// @ROUTE GET api/vendors/:id
// @DESC get vendor info by id
// @ACCESS Private
router.get(
  "/:vendor_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  VendorsController.getById
);

// @ROUTE GET api/vendors
// @DESC get all vendors
// @ACCESS Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  VendorsController.getAll
);

// @route POST api/vendors
// @desc add new vendors
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  VendorsController.addNew
);
module.exports = router;
