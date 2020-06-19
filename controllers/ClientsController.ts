const Client = require("../modules/Client");
const Order = require("../modules/Order");

exports.deleteById = function (req, res) {
  Client.findByIdAndDelete(req.params.client_id, (err, lang) => {
    if (err) {
      res.send(err);
    }
    if (!lang) {
      res.status(404).json({ success: false, error: "client not found" });
    }

    res.status(200).json({ success: true, item: lang._doc });
  });
};

exports.updateById = function (req, res) {
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
};

exports.getById = function (req, res) {
  Client.findById(req.params.client_id)
    .then((client) => {
      if (!client) {
        const errors = {
          message: "There are no client",
          details: "",
        };
        return res.status(404).json(errors);
      }
      Order.find({
        client: req.params.client_id,
      })
        .sort("-createdAt")
        .populate("clients", "name")
        .populate({
          path: "services.service",
          populate: { path: "from to", select: "name" },
        })
        .then((orders) => {
          const response = { ...client._doc, orders };
          return res.status(200).json(response);
        })
        .catch((err) => {
          const errors = {
            message: "Error getting client orders",
            details: err,
          };
          return res.status(404).json(errors);
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Cannot get client",
        details: err,
      });
    });
};

exports.addNew = function (req, res) {
  // get post fields
  const newClient = new Client({
    name: req.body.name,
  });

  newClient.save().then((client) => res.json(client));
};

exports.getAll = function (req, res) {
  Client.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "client",
        as: "orders",
      },
    },
    {
      $project: {
        name: 1,
        createdAt: 1,
        sumOfOrders: {
          $sum: "$orders.total",
        },
      },
    },
  ])
    .then((clients) => {
      if (!clients) {
        const errors = {
          noclients: "There are no clients",
        };

        return res.status(404).json(errors);
      }

      res.status(200).json(clients);
    })
    .catch((err) => {
      res.status(404).json({
        noposts: "Cannot get clients",
      });
    });
};
