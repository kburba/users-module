const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const OrderSchema = new Schema(
  {
    invoiceID: String,
    details: {
      name: {
        type: String,
        required: true,
      },
      orderId: {
        type: String,
        required: true,
      },
    },
    client: {
      type: Schema.ObjectId,
      ref: "clients",
    },
    services: [
      {
        service: {
          type: Schema.ObjectId,
          ref: "services",
        },
        pagesQty: {
          type: Number,
        },
        customPrice: {
          type: Number,
        },
        totalPrice: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "created",
    },
    comments: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("orders", OrderSchema);
