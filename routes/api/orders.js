const express = require("express");

const router = express.Router();
const passport = require("passport");

const validateOrdersInput = require("../../validation/orders");

const Language = require("../../modules/Language");
const Order = require("../../modules/Order");

// @ROUTE   DELETE api/orders/:id,
// @DESC    Delete existing language
// @ACCESS  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Order.findByIdAndDelete(req.params.id, (err, order) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (!order) {
        return res.status(404).json({
          success: false,
          error: `Order ID: ${req.params.id} not found!`,
        });
      }

      return res.status(200).json({ success: true, count: 1 });
    });
  }
);

// @ROUTE   PUT api/orders/:lang_id,
// @DESC    Update existing language
// @ACCESS  Private
router.put(
  "/:lang_id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Language.findById(req.params.lang_id, (err, lang) => {
      if (err) {
        res.send(err);
      }

      const { errors, isValid } = validateOrdersInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      lang.details = req.body.details;

      lang.save((err) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Language updated" });
      });
    });
  }
);

// @ROUTE   GET api/orders/:id
// @DESC    Get order by ID
// @ACCESS  Private
router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const orderId = req.params.id;
    Order.findById(orderId)
      .sort("-createdAt")
      .populate("client", "name")
      .populate({
        path: "services.service",
        populate: { path: "from to", select: "name" },
      })
      .then((orders) => {
        if (!orders) {
          const errors = {
            noItems: "Error finding orders.",
          };
          return res.status(404).json(errors);
        }

        return res.status(200).json(orders);
      })
      .catch((err) => res.status(404).json(err.errors));
  }
);
// @ROUTE   GET api/orders
// @DESC    Get all orders
// @ACCESS  Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Order.find(null)
      .sort("-createdAt")
      .populate("clients", "name")
      .populate({
        path: "services.service",
        populate: { path: "from to", select: "name" },
      })
      .then((orders) => {
        if (!orders) {
          const errors = {
            noItems: "Error finding orders.",
          };
          return res.status(404).json(errors);
        }

        return res.status(200).json(orders);
      })
      .catch((err) => res.status(404).json(err.errors));
  }
);

// @route   POST api/orders
// @desc    Add new order
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrdersInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get post fields

    const { details, services, total, client, comments } = req.body;
    const newOrder = new Order({
      details,
      services,
      client,
      total,
      comments,
    });

    newOrder
      .save()
      .then((order) => {
        order.populate(
          [
            {
              path: "services.service",
              populate: { path: "from to", select: "name" },
            },
            {
              path: "client",
              populate: { path: "client", select: "name" },
            },
          ],
          (err, doc) => {
            if (err) {
              return res
                .status(400)
                .json({ message: "Could not populate new order values" });
            }
            return res.json(doc);
          }
        );
      })
      .catch((err) => res.status(400).json(err.errors));
  }
);
module.exports = router;
