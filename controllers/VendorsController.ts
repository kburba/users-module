const Vendor = require("../modules/Vendor");

exports.deleteById = function (req, res) {
  Vendor.findByIdAndDelete(req.params.vendor_id, (err, lang) => {
    if (err) {
      res.send(err);
    }
    if (!lang) {
      res.status(404).json({ success: false, error: "vendor not found" });
    }

    res.status(200).json({ success: true, item: lang._doc });
  });
};

exports.updateById = function (req, res) {
  Vendor.findById(req.params.vendor_id, (err, vendor) => {
    if (err) {
      res.send(err);
    }
    if (vendor) {
      vendor.name = req.body.name;

      vendor.save((err) => {
        if (err) {
          res.send(err);
        }
        res.json(vendor);
      });
    }
  });
};

exports.getById = function (req, res) {
  Vendor.findById(req.params.vendor_id)
    .then((vendor) => {
      if (!vendor) {
        const errors = {
          message: "There are no vendor",
          details: "",
        };
        return res.status(404).json(errors);
      }
      Order.find({
        vendor: req.params.vendor_id,
      })
        .sort("-createdAt")
        .populate("vendors", "name")
        .populate({
          path: "services.service",
          populate: { path: "from to", select: "name" },
        })
        .then((orders) => {
          const response = { ...vendor._doc, orders };
          return res.status(200).json(response);
        })
        .catch((err) => {
          const errors = {
            message: "Error getting vendor orders",
            details: err,
          };
          return res.status(404).json(errors);
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Cannot get vendor",
        details: err,
      });
    });
};

exports.addNew = function (req, res) {
  // get post fields
  const newClient = new Vendor({
    name: req.body.name,
  });

  newClient.save().then((vendor) => res.json(vendor));
};

exports.getAll = function (req, res) {
  Vendor.find(null, "name createdAt")
    .sort("name")
    .then((vendors) => {
      if (!vendors) {
        const errors = {
          noclients: "There are no vendors",
        };

        return res.status(404).json(errors);
      }

      res.status(200).json(vendors);
    })
    .catch((err) => {
      res.status(404).json({
        noposts: "Cannot get vendors",
      });
    });
};
