const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ServiceSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "languages"
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "languages"
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = Service = mongoose.model("services", ServiceSchema);
