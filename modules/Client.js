const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Client = mongoose.model('client', ClientSchema);
