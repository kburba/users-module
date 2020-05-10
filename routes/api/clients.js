const express = require('express');

const router = express.Router();
const passport = require('passport');

const Client = require('../../modules/Client');
const Order = require('../../modules/Order');

const ClientsController = require('../../controllers/ClientsController.ts');

// @ROUTE   DELETE api/clients/:client_id,
// @DESC    Delete existing client
// @ACCESS  Private
router.delete(
  '/:client_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Client.findByIdAndDelete(req.params.client_id, (err, lang) => {
      if (err) {
        res.send(err);
      }
      if (!lang) {
        res.status(404).json({ success: false, error: 'client not found' });
      }

      res.status(200).json({ success: true, item: lang._doc });
    });
  }
);

// @ROUTE   PUT api/clients/:client_id,
// @DESC    Update existing client
// @ACCESS  Private
router.put(
  '/:client_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Client.findById(req.params.client_id, (err, client) => {
      if (err) {
        res.send(err);
      }
      if (client) {
        client.name = req.body.name;

        client.save((err) => {
          if (err) {
            res.send(err);
          }
          res.json(client);
        });
      }
    });
  }
);

// @ROUTE GET api/clients/:id
// @DESC get client info by id
// @ACCESS Private
router.get(
  '/:client_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Client.findById(req.params.client_id)
      .then((client) => {
        if (!client) {
          const errors = {
            message: 'There are no client',
            details: '',
          };
          return res.status(404).json(errors);
        }
        Order.find({
          client: req.params.client_id,
        })
          .populate('client', 'name')
          .populate({
            path: 'services.service',
            populate: { path: 'from to', select: 'name' },
          })
          .then((orders) => {
            const response = { ...client._doc, orders };
            return res.status(200).json(response);
          })
          .catch((err) => {
            const errors = {
              message: 'Error getting client orders',
              details: err,
            };
            return res.status(404).json(errors);
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: 'Cannot get client',
          details: err,
        });
      });
  }
);

// @ROUTE GET api/clients
// @DESC get all clients
// @ACCESS Private
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  ClientsController.getAll
);

// @route POST api/clients
// @desc add new clients
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  ClientsController.addNew
);
module.exports = router;
