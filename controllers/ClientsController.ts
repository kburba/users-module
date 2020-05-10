const Client = require('../modules/Client');

exports.addNew = function (req, res) {
  // get post fields
  const newClient = new Client({
    name: req.body.name,
  });

  newClient.save().then((client) => res.json(client));
};

exports.getAll = function (req, res) {
  Client.find(null, 'name createdAt')
    .sort('name')
    .then((clients) => {
      if (!clients) {
        const errors = {
          noclients: 'There are no clients',
        };

        return res.status(404).json(errors);
      }

      res.status(200).json(clients);
    })
    .catch((err) => {
      res.status(404).json({
        noposts: 'Cannot get clients',
      });
    });
};
