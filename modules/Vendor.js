const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },
    services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "services",
        },
        price: {
          type: Number,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = Vendor = mongoose.model("vendors", VendorSchema);
