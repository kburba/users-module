const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const OrderSchema = new Schema(
  {
    details: {
      name: {
        type: String,
        required: true
      },
      orderId: {
        type: String,
        required: true
      }
    },
    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: 'services'
        },
        customPrice: {
          type: Number
        }
      }
    ],
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = Order = mongoose.model('orders', OrderSchema);
