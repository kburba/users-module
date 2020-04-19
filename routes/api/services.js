const express = require('express');
const router = express.Router();
const passport = require('passport');

// Validation
const validateServiceInput = require('../../validation/services');

// Models
const Service = require('../../modules/Service');

// @ROUTE   DELETE api/services/:service_id,
// @DESC    Delete existing service
// @ACCESS  Private
router.delete(
  '/:service_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Service.findByIdAndDelete(req.params.service_id, (err, service) => {
      if (err) {
        return res.send({ success: false, message: err.message });
      }
      if (!service) {
        return res
          .status(404)
          .json({ success: false, error: 'Service not found' });
      }

      return res.status(200).json({ success: true, item: service._doc });
    });
  }
);

// @ROUTE   PUT api/services/:service_id,
// @DESC    Update existing service
// @ACCESS  Private
router.put(
  '/:service_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Service.findById(req.params.service_id).then((service) => {
      if (!service) {
        return res.status(404).send('Service not found');
      }

      const { errors, isValid } = validateServiceInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const serviceFields = {
        type: req.body.type,
        from: req.body.from,
        to: req.body.to,
        price: req.body.price,
      };

      Service.findByIdAndUpdate({ _id: req.params.service_id }, serviceFields, {
        new: true,
      })
        .then((updatedService) => {
          updatedService.populate(
            {
              path: 'from to',
              select: 'name',
            },
            (err, doc) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: 'Could not populate language' });
              }
              return res.json(doc);
            }
          );
        })
        .catch((err) => res.status(404).send(err));
    });
  }
);

// @ROUTE GET api/services
// @DESC get all services
// @ACCESS Private
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Service.find()
      .sort('from')
      .populate('from', 'name')
      .populate('to', 'name')
      .then((services) => {
        if (!services) {
          const errors = {
            noItems: 'There are no services',
          };
          return res.status(404).json(errors);
        }

        return res.status(200).json(services);
      })
      .catch((err) => {
        return res.status(404).json({
          notFound: 'Cannot get services',
        });
      });
  }
);

// @route POST api/services
// @desc add new services
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    // validate input
    const { errors, isValid } = validateServiceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // get post fields
    const newService = new Service({
      type: req.body.type,
      from: req.body.from,
      to: req.body.to,
      price: req.body.price,
    });

    newService
      .save()
      .then((savedDoc) => {
        savedDoc.populate(
          {
            path: 'from to',
            select: 'name',
          },
          (err, populatedDoc) => {
            if (err) {
              return res
                .status(400)
                .json({ message: 'Could not populate language' });
            }
            return res.json(populatedDoc);
          }
        );
      })
      .catch((err) => res.status(404).send(err));
  }
);
module.exports = router;
